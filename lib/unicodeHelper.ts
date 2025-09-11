export class UnicodeHelper {
  static insertChar(existingText: string, newChar: string, cursorPos: number): { text: string; newCursorPos: number } {
    const beforeCursor = existingText.substring(0, cursorPos);
    const afterCursor = existingText.substring(cursorPos);
    
    const newText = (beforeCursor + newChar + afterCursor).normalize('NFC');
    
    return {
      text: newText,
      newCursorPos: cursorPos + newChar.length
    };
  }
}