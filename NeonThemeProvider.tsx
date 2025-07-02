'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const NeonThemeContext = createContext();

export function NeonThemeProvider({ children }) {
  const [theme, setTheme] = useState('cyber-neon');
  const [glowIntensity, setGlowIntensity] = useState(100);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const themes = {
    'cyber-neon': {
      name: 'Cyber Neon',
      primary: 'from-cyan-400 to-blue-500',
      secondary: 'from-purple-400 to-pink-500',
      accent: 'from-green-400 to-emerald-500',
      warning: 'from-yellow-400 to-orange-500',
      danger: 'from-red-400 to-pink-500',
      background: 'from-gray-900 via-black to-purple-950',
      glow: {
        cyan: 'shadow-cyan-500/50',
        purple: 'shadow-purple-500/50',
        green: 'shadow-green-500/50',
        yellow: 'shadow-yellow-500/50',
        red: 'shadow-red-500/50',
      },
    },
    'matrix-green': {
      name: 'Matrix Green',
      primary: 'from-green-400 to-emerald-500',
      secondary: 'from-lime-400 to-green-500',
      accent: 'from-cyan-400 to-teal-500',
      warning: 'from-yellow-400 to-amber-500',
      danger: 'from-red-400 to-orange-500',
      background: 'from-black via-gray-900 to-green-950',
      glow: {
        green: 'shadow-green-500/50',
        lime: 'shadow-lime-500/50',
        cyan: 'shadow-cyan-500/50',
        yellow: 'shadow-yellow-500/50',
        red: 'shadow-red-500/50',
      },
    },
    'electric-blue': {
      name: 'Electric Blue',
      primary: 'from-blue-400 to-indigo-500',
      secondary: 'from-cyan-400 to-blue-500',
      accent: 'from-purple-400 to-indigo-500',
      warning: 'from-amber-400 to-yellow-500',
      danger: 'from-red-400 to-rose-500',
      background: 'from-gray-900 via-blue-950 to-black',
      glow: {
        blue: 'shadow-blue-500/50',
        cyan: 'shadow-cyan-500/50',
        purple: 'shadow-purple-500/50',
        amber: 'shadow-amber-500/50',
        red: 'shadow-red-500/50',
      },
    },
    'neon-pink': {
      name: 'Neon Pink',
      primary: 'from-pink-400 to-rose-500',
      secondary: 'from-purple-400 to-pink-500',
      accent: 'from-cyan-400 to-blue-500',
      warning: 'from-orange-400 to-red-500',
      danger: 'from-red-500 to-pink-500',
      background: 'from-black via-purple-950 to-pink-950',
      glow: {
        pink: 'shadow-pink-500/50',
        purple: 'shadow-purple-500/50',
        cyan: 'shadow-cyan-500/50',
        orange: 'shadow-orange-500/50',
        red: 'shadow-red-500/50',
      },
    },
  };

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const currentTheme = themes[theme];

    // Set CSS custom properties for the theme
    root.style.setProperty('--glow-intensity', `${glowIntensity}%`);
    root.style.setProperty('--animation-speed', `${animationSpeed}%`);

    // Add theme class to body
    document.body.className = `theme-${theme} glow-${glowIntensity} speed-${animationSpeed}`;
  }, [theme, glowIntensity, animationSpeed]);

  const value = {
    theme,
    setTheme,
    glowIntensity,
    setGlowIntensity,
    animationSpeed,
    setAnimationSpeed,
    themes,
    currentTheme: themes[theme],
  };

  return <NeonThemeContext.Provider value={value}>{children}</NeonThemeContext.Provider>;
}

export function useNeonTheme() {
  const context = useContext(NeonThemeContext);
  if (!context) {
    throw new Error('useNeonTheme must be used within a NeonThemeProvider');
  }
  return context;
}
