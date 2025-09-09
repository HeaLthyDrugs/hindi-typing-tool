'use client';

import { useState, useEffect } from 'react';
import LayoutSwitcher from '../components/LayoutSwitcher';
import TypingArea from '../components/TypingArea';
import KeyboardStatus from '../components/KeyboardStatus';
import KeyboardLayout from '../components/KeyboardLayout';
import FontLoader from '../components/FontLoader';
import HelpPanel from '../components/HelpPanel';

const layouts = [
  { id: 'krutidev', name: 'Krutidev 010', font: 'krutidev' },
  { id: 'inscript', name: 'Mangal Inscript', font: 'mangal' },
  { id: 'remingtonGail', name: 'Mangal Remington GAIL', font: 'mangal' },
  { id: 'remingtonCbi', name: 'Mangal Remington CBI', font: 'mangal' }
];

export default function Home() {
  const [currentLayout, setCurrentLayout] = useState('krutidev');
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hindiTypingLayout');
    if (saved && layouts.find(l => l.id === saved)) {
      setCurrentLayout(saved);
    }
  }, []);

  const handleLayoutChange = (layout: string) => {
    setCurrentLayout(layout);
    localStorage.setItem('hindiTypingLayout', layout);
  };

  const currentLayoutInfo = layouts.find(l => l.id === currentLayout) || layouts[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <FontLoader />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Hindi Typing Tool
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <LayoutSwitcher
            currentLayout={currentLayout}
            onLayoutChange={handleLayoutChange}
            layouts={layouts}
          />
          
          <TypingArea
            layout={currentLayout}
            value={text}
            onChange={setText}
            placeholder="Start typing in Hindi..."
          />
          
          <KeyboardStatus
            currentLayout={currentLayout}
            layoutName={currentLayoutInfo.name}
          />
          
          <KeyboardLayout currentLayout={currentLayout} />
        </div>
      </div>
      
      <HelpPanel />
    </div>
  );
}
