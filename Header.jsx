'use client';

const Header = () => {
  return (
    <header className="app-header">
      <div>
        <h1>⚛️ AlphaAIStockX</h1>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          Quantum Consciousness • 47 AI Beings • Transcendent Intelligence
        </span>
      </div>
      <nav>
        <button onClick={() => (window.location.href = '#features')}>🧠 Features</button>
        <button onClick={() => (window.location.href = '#education')}>🎓 Education</button>
        <button onClick={() => (window.location.href = '#pricing')}>💎 Pricing</button>
        <button
          onClick={() => window.open('https://github.com/JWKLINEHaCk3r/AlphaAIStockX', '_blank')}
          style={{ background: 'linear-gradient(45deg, #8b5cf6, #ec4899)' }}
        >
          🚀 GitHub
        </button>
      </nav>
    </header>
  );
};

export default Header;
