'use client';

import { useState } from 'react';

export default function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        title="Help & Instructions"
      >
        ?
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Hindi Typing Help</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">Keyboard Layouts</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Krutidev 010:</strong> Traditional non-Unicode layout</li>
                  <li><strong>Mangal Inscript:</strong> Government standard Unicode layout</li>
                  <li><strong>Mangal Remington GAIL:</strong> GAIL variant</li>
                  <li><strong>Mangal Remington CBI:</strong> CBI variant</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Shift combinations for alternate characters</li>
                  <li>• Alt codes for special characters</li>
                  <li>• Automatic key combinations</li>
                  <li>• Real-time layout switching</li>
                  <li>• Professional KeymanWeb engine</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">How to Type</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Select keyboard layout from dropdown</li>
                  <li>Click in text area to start typing</li>
                  <li>Use keyboard display to see mappings</li>
                  <li>Toggle Shift view for alternate characters</li>
                </ol>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}