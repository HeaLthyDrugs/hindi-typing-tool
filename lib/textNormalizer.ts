export class TextNormalizer {
  static normalizeDevanagari(text: string): string {
    // Normalize Unicode text for proper Devanagari rendering
    let normalized = text.normalize('NFC');
    
    // Fix common matra ordering issues
    normalized = normalized
      // Ensure proper order for combining marks
      .replace(/([क-ह])([ु-ू])([ं-ः])/g, '$1$3$2')
      // Fix nukta placement
      .replace(/([क-ह])(़)([ा-ौ])/g, '$1$3$2')
      // Normalize ZWJ/ZWNJ usage
      .replace(/\u200C+/g, '\u200C')
      .replace(/\u200D+/g, '\u200D');
    
    return normalized;
  }
  
  static isDevanagariMatra(char: string): boolean {
    const matraRange = /[\u093E-\u094F\u0951-\u0957]/;
    return matraRange.test(char);
  }
  
  static isDevanagariConsonant(char: string): boolean {
    const consonantRange = /[\u0915-\u0939]/;
    return consonantRange.test(char);
  }
}