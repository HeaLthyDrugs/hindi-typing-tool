'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Mangal&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    const css = [
      '.krutidev-font { font-family: "Noto Sans Devanagari", "Mangal", "Arial Unicode MS", sans-serif; font-feature-settings: "akhn" on, "rphf" on, "blwf" on, "half" on, "vatu" on, "pres" on, "abvs" on, "blws" on, "psts" on, "haln" on, "calt" on; }',
      '.mangal-font { font-family: "Noto Sans Devanagari", "Mangal", "Arial Unicode MS", sans-serif; font-feature-settings: "akhn" on, "rphf" on, "blwf" on, "half" on, "vatu" on, "pres" on, "abvs" on, "blws" on, "psts" on, "haln" on, "calt" on; }'
    ].join('\n');
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}