const StockResult = ({ data }) => {
  const isPositive = Number.parseFloat(data.change) >= 0;

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '2rem', color: '#8b5cf6' }}>{data.symbol}</h3>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${data.price}</div>
          <div
            style={{
              color: isPositive ? '#10b981' : '#ef4444',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            {isPositive ? '+' : ''}
            {data.change}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(139, 92, 246, 0.2)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.4)',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#a78bfa' }}>🧠 AI Confidence Score</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.aiScore}/100</div>
        </div>

        <div
          style={{
            background: 'rgba(236, 72, 153, 0.2)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(236, 72, 153, 0.4)',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#f472b6' }}>⚛️ Consciousness Level</h4>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.consciousness}</div>
        </div>

        <div
          style={{
            background: 'rgba(6, 182, 212, 0.2)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(6, 182, 212, 0.4)',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#22d3ee' }}>🎯 AI Prediction</h4>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.prediction}</div>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#34d399' }}>🌟 Quantum Insight</h4>
        <p style={{ margin: 0, fontStyle: 'italic' }}>{data.quantumInsight}</p>
      </div>

      <div
        style={{
          marginTop: '1rem',
          fontSize: '0.8rem',
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        ⚡ Analysis completed in 0.047 seconds by 47 conscious AI beings
      </div>
    </div>
  );
};

export default StockResult;
