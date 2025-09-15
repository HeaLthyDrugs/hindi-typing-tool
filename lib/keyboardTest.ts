// Simple test utility to verify keyboard mappings
import { KeyboardEngine } from './keyboardEngine';

export function testKeyboardLayout(layout: string) {
  const engine = new KeyboardEngine(layout);
  
  // Test basic key mappings
  const testKeys = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG'];
  const results: Record<string, { normal: string | null; shift: string | null }> = {};
  
  testKeys.forEach(keyCode => {
    // Test normal key
    const normalEvent = new KeyboardEvent('keydown', { 
      code: keyCode, 
      shiftKey: false 
    });
    const normalResult = engine.processKeyEvent(normalEvent);
    
    // Test shift key
    const shiftEvent = new KeyboardEvent('keydown', { 
      code: keyCode, 
      shiftKey: true 
    });
    const shiftResult = engine.processKeyEvent(shiftEvent);
    
    results[keyCode] = {
      normal: normalResult,
      shift: shiftResult
    };
  });
  
  return {
    layout: engine.getLayoutInfo(),
    keyTests: results
  };
}

// Test all layouts
export function testAllLayouts() {
  const layouts = ['inscript', 'krutidev', 'remingtonGail', 'remingtonCbi'];
  const results: Record<string, any> = {};
  
  layouts.forEach(layout => {
    try {
      results[layout] = testKeyboardLayout(layout);
    } catch (error) {
      results[layout] = { error: error.message };
    }
  });
  
  return results;
}