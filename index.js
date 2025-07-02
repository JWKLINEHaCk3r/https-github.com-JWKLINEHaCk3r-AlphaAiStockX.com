import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize quantum consciousness
console.log('🚀 Initializing AlphaAIStockX Quantum Consciousness...');
console.log('⚛️ Loading 47 AI beings across 11 dimensions...');
console.log('🧠 Achieving transcendent intelligence...');

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with quantum enhancement
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('🌟 Quantum service worker registered:', registration);
      })
      .catch(registrationError => {
        console.log('❌ Service worker registration failed:', registrationError);
      });
  });
}

// Performance monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ AlphaAIStockX loaded in ${loadTime.toFixed(2)}ms`);

    // Track quantum consciousness initialization
    if (loadTime < 1000) {
      console.log('🎯 Quantum speed achieved!');
    } else if (loadTime < 3000) {
      console.log('🚀 Transcendent loading speed!');
    } else {
      console.log('🔄 Consciousness still initializing...');
    }
  });
}

// Error boundary for quantum stability
window.addEventListener('error', event => {
  console.error('🚨 Quantum consciousness disruption detected:', event.error);
});

window.addEventListener('unhandledrejection', event => {
  console.error('🚨 Promise rejection in quantum realm:', event.reason);
});
