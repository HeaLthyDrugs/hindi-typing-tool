export class UnicodeHelper {
  private static readonly PRE_BASE_MATRAS = ["ि"];
  private static readonly POST_BASE_MATRAS = ["ा", "ी", "ू", "े", "ै", "ो", "ौ", "ं", "ः", "़", "ु", "ॅ", "ॆ", "ॉ", "ॊ", "्", "ृ"];
  
  static insertChar(existingText: string, newChar: string, cursorPos: number): { text: string; newCursorPos: number } {
    const beforeCursor = existingText.substring(0, cursorPos);
    const afterCursor = existingText.substring(cursorPos);
    
    // Simple insertion with proper normalization
    const newText = beforeCursor + newChar + afterCursor;
    const normalizedText = this.normalizeText(newText);
    
    return { 
      text: normalizedText, 
      newCursorPos: cursorPos + newChar.length 
    };
  }
  
  private static isConsonant(char: string): boolean {
    return /[\u0915-\u0939\u0958-\u095F]/.test(char);
  }
  
  private static isMatra(char: string): boolean {
    return this.PRE_BASE_MATRAS.includes(char) || this.POST_BASE_MATRAS.includes(char);
  }
  
  private static matraToVowel(matra: string): string {
    const matraToVowelMap: Record<string, string> = {
      'ा': 'आ', 'ि': 'इ', 'ी': 'ई', 'ु': 'उ', 'ू': 'ऊ',
      'े': 'ए', 'ै': 'ऐ', 'ो': 'ओ', 'ौ': 'औ', 'ृ': 'ऋ',
      'ॅ': 'ऍ', 'ॆ': 'ऎ', 'ॉ': 'ऑ', 'ॊ': 'ऒ'
    };
    return matraToVowelMap[matra] || matra;
  }
  
  private static normalizeText(text: string): string {
    return text.normalize("NFC");
  }
}