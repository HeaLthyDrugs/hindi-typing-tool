'use client';

import { useState } from 'react';
import mappings from '../mappings.json';

interface KeyboardLayoutProps {
  currentLayout: string;
}

export default function KeyboardLayout({ currentLayout }: KeyboardLayoutProps) {
  const [showShift, setShowShift] = useState(false);
  
  const mapping = mappings[currentLayout as keyof typeof mappings];
  if (!mapping) return null;

  const keyRows = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'],
    ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
    ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']
  ];

  const getKeyLabel = (keyCode: string) => {
    const keyMapping = mapping.keys[keyCode as keyof typeof mapping.keys];
    if (!keyMapping) return keyCode.replace('Key', '').replace('Digit', '');
    
    return showShift ? keyMapping.shift : keyMapping.default;
  };

  const getKeyDisplay = (keyCode: string) => {
    const baseKey = keyCode.replace('Key', '').replace('Digit', '');
    return baseKey;
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Keyboard Layout</h3>
        <button
          onClick={() => setShowShift(!showShift)}
          className={`px-3 py-1 rounded text-sm ${
            showShift 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showShift ? 'Shift ON' : 'Shift OFF'}
        </button>
      </div>
      
      <div className="space-y-2">
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((keyCode) => (
              <div
                key={keyCode}
                className="min-w-[40px] h-10 bg-white border border-gray-300 rounded flex flex-col items-center justify-center text-xs hover:bg-gray-100"
                title={`${getKeyDisplay(keyCode)} → ${getKeyLabel(keyCode)}`}
              >
                <div className="text-gray-500 text-[10px]">
                  {getKeyDisplay(keyCode)}
                </div>
                <div className="font-semibold text-blue-600">
                  {getKeyLabel(keyCode)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {Object.keys(mapping.combinations).length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Key Combinations:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {Object.entries(mapping.combinations).map(([combo, result]) => (
              <div key={combo} className="bg-white p-2 rounded border">
                <span className="text-gray-600">{combo}</span> → <span className="font-semibold text-green-600">{result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}