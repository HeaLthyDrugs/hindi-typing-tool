import mappings from '../mappings.json';
import { TextNormalizer } from './textNormalizer';

export interface KeyboardMapping {
  name: string;
  description: string;
  keys: Record<string, { default: string; shift: string }>;
  combinations: Record<string, string>;
  altCodes: Record<string, string>;
}

export class KeyboardEngine {
  private currentLayout: string = 'inscript';
  private isShiftPressed: boolean = false;
  private isAltPressed: boolean = false;
  private lastTypedChars: string = '';

  constructor(layout: string = 'inscript') {
    this.currentLayout = layout;
  }

  setLayout(layout: string) {
    this.currentLayout = layout;
  }

  private getCurrentMapping(): KeyboardMapping {
    return mappings[this.currentLayout as keyof typeof mappings] as KeyboardMapping;
  }

  processKeyEvent(event: KeyboardEvent): string | null {
    const mapping = this.getCurrentMapping();
    this.isShiftPressed = event.shiftKey;
    this.isAltPressed = event.altKey;

    // Handle special keys that should reset combination buffer
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'Backspace') {
      this.resetCombinationBuffer();
      if (event.code === 'Space') return ' ';
      if (event.code === 'Enter') return '\n';
      return null; // Let backspace be handled normally
    }

    // Handle Alt codes
    if (this.isAltPressed && event.code.startsWith('Digit')) {
      const altCode = `Alt${event.code.replace('Digit', '0')}`;
      if (mapping.altCodes && mapping.altCodes[altCode]) {
        return mapping.altCodes[altCode];
      }
    }

    // Handle regular key mappings
    const keyMapping = mapping.keys[event.code];
    if (keyMapping) {
      const char = this.isShiftPressed ? keyMapping.shift : keyMapping.default;
      
      if (!char) return null;
      
      // Check for combinations if they exist
      if (mapping.combinations && Object.keys(mapping.combinations).length > 0) {
        const potentialCombination = this.lastTypedChars + char;
        for (const [combo, result] of Object.entries(mapping.combinations)) {
          if (potentialCombination.endsWith(combo)) {
            this.lastTypedChars = potentialCombination.slice(0, -combo.length) + result;
            return result;
          }
        }
      }
      
      this.lastTypedChars += char;
      // Keep only last 5 characters for combination checking
      if (this.lastTypedChars.length > 5) {
        this.lastTypedChars = this.lastTypedChars.slice(-5);
      }
      
      // Normalize the character before returning
      return TextNormalizer.normalizeText(char);
    }

    return null;
  }

  resetCombinationBuffer() {
    this.lastTypedChars = '';
  }

  getLayoutInfo() {
    const mapping = this.getCurrentMapping();
    return {
      name: mapping.name,
      description: mapping.description,
      layout: this.currentLayout
    };
  }
}