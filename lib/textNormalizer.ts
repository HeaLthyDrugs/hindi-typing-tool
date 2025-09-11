import { CharacterJoiner } from './characterJoiner';

export class TextNormalizer {
  // Zero Width Non-Joiner and Zero Width Joiner
  private static readonly ZWNJ = '\u200C';
  private static readonly ZWJ = '\u200D';
  
  // Devanagari Unicode ranges
  private static readonly CONSONANTS = /[\u0915-\u0939\u0958-\u095F]/;
  private static readonly VOWELS = /[\u0905-\u0914]/;
  private static readonly MATRAS = /[\u093E-\u094F\u0955-\u0957]/;
  private static readonly VIRAMA = '\u094D'; // Halant
  private static readonly NUKTA = '\u093C';
  private static readonly ANUSVARA = '\u0902';
  private static readonly VISARGA = '\u0903';
  private static readonly CANDRABINDU = '\u0901';
  
  // Pre-base matras that appear before the consonant
  private static readonly PRE_BASE_MATRAS = ['\u093F']; // ि
  
  // Post-base matras that appear after the consonant
  private static readonly POST_BASE_MATRAS = [
    '\u093E', // ा
    '\u0940', // ी
    '\u0941', // ु
    '\u0942', // ू
    '\u0943', // ृ
    '\u0944', // ॄ
    '\u0947', // े
    '\u0948', // ै
    '\u094B', // ो
    '\u094C', // ौ
    '\u0955', // ॕ
    '\u0956', // ॖ
    '\u0957'  // ॗ
  ];
  
  static normalizeText(text: string): string {
    // First apply Unicode NFC normalization
    let normalized = text.normalize('NFC');
    
    // Remove any existing ZWJ/ZWNJ to start fresh
    normalized = normalized.replace(/[\u200C\u200D]/g, '');
    
    // Process character by character to fix joining issues
    normalized = this.fixCharacterJoining(normalized);
    
    // Use CharacterJoiner for additional fixes
    normalized = CharacterJoiner.fixCharacterJoining(normalized);
    
    // Apply proper Unicode normalization again
    normalized = normalized.normalize('NFC');
    
    return normalized;
  }
  
  private static fixCharacterJoining(text: string): string {
    const chars = Array.from(text);
    const result: string[] = [];
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const prevChar = i > 0 ? chars[i - 1] : '';
      const nextChar = i < chars.length - 1 ? chars[i + 1] : '';
      
      // Handle virama (halant) properly
      if (char === this.VIRAMA) {
        result.push(char);
        // Add ZWJ after virama if next character is a consonant to ensure proper joining
        if (nextChar && this.CONSONANTS.test(nextChar)) {
          result.push(this.ZWJ);
        }
        continue;
      }
      
      // Handle nukta properly
      if (char === this.NUKTA) {
        result.push(char);
        continue;
      }
      
      // Handle matras
      if (this.MATRAS.test(char)) {
        // For pre-base matras, ensure they're properly positioned
        if (this.PRE_BASE_MATRAS.includes(char)) {
          result.push(char);
        } else {
          // For post-base matras, add them normally
          result.push(char);
        }
        continue;
      }
      
      // Handle consonants
      if (this.CONSONANTS.test(char)) {
        result.push(char);
        
        // If next character is nukta, virama, or matra, ensure proper joining
        if (nextChar && (nextChar === this.NUKTA || nextChar === this.VIRAMA || this.MATRAS.test(nextChar))) {
          // Character will join naturally, no need for explicit joiner
        }
        continue;
      }
      
      // Handle vowels and other characters normally
      result.push(char);
    }
    
    return result.join('');
  }
  
  static insertCharacterAtPosition(text: string, char: string, position: number): { text: string; newPosition: number } {
    const beforeCursor = text.substring(0, position);
    const afterCursor = text.substring(position);
    
    // Handle special cases for proper character insertion
    let insertedChar = char;
    let newPos = position + char.length;
    
    // If inserting a matra after a consonant, ensure proper joining
    if (this.MATRAS.test(char) && beforeCursor.length > 0) {
      const lastChar = beforeCursor.slice(-1);
      if (this.CONSONANTS.test(lastChar)) {
        // Matra will join naturally with consonant
        insertedChar = char;
      }
    }
    
    // If inserting virama, ensure proper handling
    if (char === this.VIRAMA && beforeCursor.length > 0) {
      const lastChar = beforeCursor.slice(-1);
      if (this.CONSONANTS.test(lastChar)) {
        insertedChar = char;
      }
    }
    
    const newText = beforeCursor + insertedChar + afterCursor;
    const normalizedText = this.normalizeText(newText);
    
    return {
      text: normalizedText,
      newPosition: newPos
    };
  }
  
  static isDevanagariChar(char: string): boolean {
    return /[\u0900-\u097F]/.test(char);
  }
  
  static getCharacterType(char: string): 'consonant' | 'vowel' | 'matra' | 'virama' | 'nukta' | 'other' {
    if (this.CONSONANTS.test(char)) return 'consonant';
    if (this.VOWELS.test(char)) return 'vowel';
    if (this.MATRAS.test(char)) return 'matra';
    if (char === this.VIRAMA) return 'virama';
    if (char === this.NUKTA) return 'nukta';
    return 'other';
  }
}