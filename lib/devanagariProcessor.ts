import { TextNormalizer } from './textNormalizer';

export class DevanagariProcessor {
  static processInput(currentText: string, newChar: string, cursorPos: number): { text: string; newCursorPos: number } {
    return TextNormalizer.insertCharacterAtPosition(currentText, newChar, cursorPos);
  }
}