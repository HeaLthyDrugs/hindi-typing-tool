export class DevanagariProcessor {
  private static readonly CONSONANTS = /[\u0915-\u0939\u0958-\u095F]/;
  private static readonly MATRAS = /[\u093E-\u094F]/;
  private static readonly VOWELS = /[\u0905-\u0914]/;
  
  static processInput(currentText: string, newChar: string, cursorPos: number): { text: string; newCursorPos: number } {
    // If it's a matra, check if it should attach to previous consonant
    if (this.MATRAS.test(newChar)) {
      const beforeCursor = currentText.substring(0, cursorPos);
      const afterCursor = currentText.substring(cursorPos);
      
      // Find the last character before cursor
      const lastChar = beforeCursor.slice(-1);
      
      // If last character is a consonant, attach matra
      if (this.CONSONANTS.test(lastChar)) {
        const newText = beforeCursor + newChar + afterCursor;
        return { text: newText, newCursorPos: cursorPos + newChar.length };
      }
      
      // If no consonant before, convert matra to independent vowel
      const independentVowel = this.matraToVowel(newChar);
      if (independentVowel) {
        const newText = beforeCursor + independentVowel + afterCursor;
        return { text: newText, newCursorPos: cursorPos + independentVowel.length };
      }
    }
    
    // For all other characters, insert normally
    const newText = currentText.substring(0, cursorPos) + newChar + currentText.substring(cursorPos);
    return { text: newText, newCursorPos: cursorPos + newChar.length };
  }
  
  private static matraToVowel(matra: string): string {
    const matraToVowelMap: Record<string, string> = {
      'ा': 'आ',
      'ि': 'इ', 
      'ी': 'ई',
      'ु': 'उ',
      'ू': 'ऊ',
      'े': 'ए',
      'ै': 'ऐ',
      'ो': 'ओ',
      'ौ': 'औ',
      'ृ': 'ऋ',
      'ॆ': 'ऎ',
      'ॊ': 'ऒ',
      'ॉ': 'ऑ',
      'ॅ': 'ऍ'
    };
    return matraToVowelMap[matra] || matra;
  }
}