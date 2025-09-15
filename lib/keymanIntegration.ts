'use client';

export class KeymanIntegration {
  private currentKeyboard: string = '';

  async initialize(): Promise<boolean> {
    // Disable Keyman integration, use only custom keyboard engine
    return true;
  }

  async attachToElement(element: HTMLElement): Promise<void> {
    // No-op, using custom keyboard engine only
  }

  async setKeyboard(keyboardId: string): Promise<void> {
    this.currentKeyboard = keyboardId;
  }

  getCurrentKeyboard(): string {
    return this.currentKeyboard;
  }

  isReady(): boolean {
    return true;
  }
}