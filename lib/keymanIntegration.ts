'use client';

declare global {
  interface Window {
    keyman: {
      init: (config: { attachType: string }) => void;
      attachToControl: (element: HTMLElement) => void;
      setActiveKeyboard: (keyboardId: string) => Promise<void>;
    } | undefined;
  }
}

export class KeymanIntegration {
  private isInitialized: boolean = false;
  private currentKeyboard: string = '';

  async initialize(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false;

      // Load KeymanWeb script
      if (!window.keyman) {
        await this.loadKeymanScript();
      }

      // Initialize KeymanWeb
      window.keyman.init({
        attachType: 'manual'
      });

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize KeymanWeb:', error);
      return false;
    }
  }

  private loadKeymanScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://s.keyman.com/kmw/engine/17.0.326/keymanweb.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load KeymanWeb'));
      document.head.appendChild(script);
    });
  }

  async attachToElement(element: HTMLElement): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (window.keyman && element) {
      window.keyman.attachToControl(element);
    }
  }

  async setKeyboard(keyboardId: string): Promise<void> {
    if (!this.isInitialized) return;

    try {
      // Map our layout IDs to KeymanWeb keyboard IDs
      const keyboardMap: Record<string, string> = {
        'inscript': 'basic_kbdinhindi',
        'krutidev': 'krutidev_010',
        'remingtonGail': 'remington_gail',
        'remingtonCbi': 'remington_cbi'
      };

      const keymanKeyboard = keyboardMap[keyboardId];
      if (keymanKeyboard && window.keyman) {
        await window.keyman.setActiveKeyboard(keymanKeyboard);
        this.currentKeyboard = keyboardId;
      }
    } catch (error) {
      console.error('Failed to set keyboard:', error);
    }
  }

  getCurrentKeyboard(): string {
    return this.currentKeyboard;
  }

  isReady(): boolean {
    return this.isInitialized && !!window.keyman;
  }
}