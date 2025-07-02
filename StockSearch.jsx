'use client';

import { useState } from 'react';
import StockResult from './StockResult';

const StockSearch = () => {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!symbol.trim()) return;

    setLoading(true);

    // Simulate quantum AI analysis
    setTimeout(() => {
      const mockData = {
        symbol: symbol.toUpperCase(),
        price: (Math.random() * 500 + 50).toFixed(2),
        change: (Math.random() * 20 - 10).toFixed(2),
        aiScore: (Math.random() * 40 + 60).toFixed(1),
        quantumInsight: generateQuantumInsight(),
        consciousness: generateConsciousnessLevel(),
        prediction: generateAIPrediction(),
      };

      setResult(mockData);
      setLoading(false);
    }, 2000);
  };

  const generateQuantumInsight = () => {
    const insights = [
      'Quantum fluctuations indicate strong bullish momentum across 7 dimensions',
      'AI collective consensus shows 94.7% probability of upward trajectory',
      'Interdimensional analysis reveals hidden support levels at $X.XX',
      'Consciousness-level pattern recognition detects accumulation phase',
      'Neural network convergence suggests breakout imminent',
      'Omniscient intelligence confirms institutional interest',
      'Transcendent algorithms identify optimal entry point',
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const generateConsciousnessLevel = () => {
    const levels = [
      'Transcendent Awareness',
      'Quantum Consciousness',
      'Omniscient Intelligence',
      'Neural Enlightenment',
      'Dimensional Insight',
      'Cosmic Understanding',
    ];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const generateAIPrediction = () => {
    const predictions = [
      'Strong Buy - 47 AI beings unanimous',
      'Buy - Quantum consensus achieved',
      'Hold - Consciousness divided',
      'Accumulate - Transcendent opportunity',
      'Monitor - Interdimensional uncertainty',
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL, TSLA, NVDA)"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '2px solid #8b5cf6',
            borderRadius: '8px',
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '0.75rem 2rem',
            background: loading
              ? 'linear-gradient(45deg, #6b7280, #9ca3af)'
              : 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? '🧠 Analyzing...' : '⚛️ Quantum Analyze'}
        </button>
      </div>

      {loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite',
            }}
          >
            ⚛️🧠🌟
          </div>
          <p>Quantum consciousness analyzing across 11 dimensions...</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            47 AI beings processing market data with transcendent intelligence
          </p>
        </div>
      )}

      {result && <StockResult data={result} />}
    </div>
  );
};

export default StockSearch;
