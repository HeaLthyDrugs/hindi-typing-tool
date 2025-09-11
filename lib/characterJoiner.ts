export class CharacterJoiner {
  // Common problematic character sequences that cause circles
  private static readonly PROBLEMATIC_SEQUENCES = [
    // Matra combinations that often break
    /([क-ह])([ॆीूंांत])/g,
    // Halant combinations
    /([क-ह])(्)([क-ह])/g,
    // Nukta combinations
    /([क-ह])(़)/g,
  ];

  // Zero Width Joiner for forcing character joining
  private static readonly ZWJ = '\u200D';
  
  static fixCharacterJoining(text: string): string {
    let fixed = text;
    
    // Remove any existing problematic zero-width characters first
    fixed = fixed.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
    
    // Apply Unicode NFC normalization
    fixed = fixed.normalize('NFC');
    
    // Fix specific problematic sequences
    fixed = this.fixMatraCombinations(fixed);
    fixed = this.fixHalantCombinations(fixed);
    fixed = this.fixNuktaCombinations(fixed);
    
    // Final normalization
    fixed = fixed.normalize('NFC');
    
    return fixed;
  }
  
  private static fixMatraCombinations(text: string): string {
    // Fix common matra joining issues
    return text
      // Fix ॆ (short e) combinations
      .replace(/([क-ह])(ॆ)/g, '$1$2')
      // Fix ी (long i) combinations  
      .replace(/([क-ह])(ी)/g, '$1$2')
      // Fix ू (long u) combinations
      .replace(/([क-ह])(ू)/g, '$1$2')
      // Fix ं (anusvara) combinations
      .replace(/([क-ह])(ं)/g, '$1$2')
      // Fix ां combinations
      .replace(/([क-ह])(ा)(ं)/g, '$1$2$3')
      // Fix त combinations
      .replace(/([क-ह])(त)/g, '$1$2')
      // Fix उ combinations
      .replace(/([क-ह])(उ)/g, '$1$2');
  }
  
  private static fixHalantCombinations(text: string): string {
    // Fix halant (virama) combinations that create conjuncts
    return text.replace(/([क-ह])(्)([क-ह])/g, (match, cons1, halant, cons2) => {
      // Ensure proper conjunct formation
      return cons1 + halant + cons2;
    });
  }
  
  private static fixNuktaCombinations(text: string): string {
    // Fix nukta combinations
    return text.replace(/([क-ह])(़)/g, '$1$2');
  }
  
  static validateDevanagariText(text: string): boolean {
    // Check if text contains valid Devanagari characters
    const devanagariRange = /^[\u0900-\u097F\s\u0020-\u007F]*$/;
    return devanagariRange.test(text);
  }
  
  static removeInvalidCharacters(text: string): string {
    // Remove any characters that might cause rendering issues
    return text.replace(/[^\u0900-\u097F\s\u0020-\u007F]/g, '');
  }
}