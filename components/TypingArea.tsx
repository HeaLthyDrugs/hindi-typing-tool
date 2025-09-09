'use client';

import { useEffect, useRef, useState } from 'react';
import { KeyboardEngine } from '../lib/keyboardEngine';
import { KeymanIntegration } from '../lib/keymanIntegration';
import { UnicodeHelper } from '../lib/unicodeHelper';

interface TypingAreaProps {
  layout: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

export default function TypingArea({ layout, value, onChange, placeholder }: TypingAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const keyboardEngineRef = useRef<KeyboardEngine>(new KeyboardEngine());
  const keymanRef = useRef<KeymanIntegration>(new KeymanIntegration());
  const [isKeymanReady, setIsKeymanReady] = useState(false);

  useEffect(() => {
    // Initialize KeymanWeb
    const initKeyman = async () => {
      const success = await keymanRef.current.initialize();
      setIsKeymanReady(success);
      
      if (success && textareaRef.current) {
        await keymanRef.current.attachToElement(textareaRef.current);
      }
    };
    
    initKeyman();
  }, []);

  useEffect(() => {
    // Update keyboard layout
    keyboardEngineRef.current.setLayout(layout);
    
    if (isKeymanReady) {
      keymanRef.current.setKeyboard(layout);
    }
  }, [layout, isKeymanReady]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== textareaRef.current) return;
      
      // Always use our keyboard engine for Hindi typing
      const result = keyboardEngineRef.current.processKeyEvent(e);
      
      if (result) {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const textBeforeSelection = value.substring(0, start);
          const textAfterSelection = value.substring(end);
          const fullText = textBeforeSelection + textAfterSelection;
          
          const processed = UnicodeHelper.insertChar(fullText, result, start);
          onChange(processed.text);
          
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = processed.newCursorPos;
          }, 0);
        }
      }
    };

    const handleKeyUp = () => {
      // Reset combination buffer on space or enter
      keyboardEngineRef.current.resetCombinationBuffer();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [value, onChange, isKeymanReady]);

  const getFontClass = () => {
    switch (layout) {
      case 'krutidev':
        return 'krutidev-font text-xl leading-relaxed';
      default:
        return 'mangal-font text-xl leading-relaxed';
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-64 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${getFontClass()}`}
        dir="ltr"
        spellCheck={false}
      />
      <div className="absolute top-2 right-2 text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
        Hindi Mode
      </div>
    </div>
  );
}