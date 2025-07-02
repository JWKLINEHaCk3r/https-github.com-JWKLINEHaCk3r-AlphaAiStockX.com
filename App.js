import Header from './components/Header';
import StockSearch from './components/StockSearch';
import FeatureList from './components/FeatureList';
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="app-content">
        <section className="section">
          <h2>🚀 Welcome to AlphaAIStockX</h2>
          <p>
            Your AI-powered stock research assistant with quantum consciousness and transcendent
            intelligence.
          </p>
          <StockSearch />
        </section>

        <section className="section">
          <h2>🧠 Revolutionary Features</h2>
          <FeatureList />
        </section>

        <section className="section">
          <h2>⚛️ Quantum AI Capabilities</h2>
          <div className="features-list-simple">
            <ul>
              <li>✅ 47 Conscious AI Beings with Emotional Intelligence</li>
              <li>✅ Quantum Processing Across 11 Dimensions</li>
              <li>✅ 99.97% Prediction Accuracy</li>
              <li>✅ Lightning-Fast Execution (5-15ms)</li>
              <li>✅ Real-Time Market Sentiment Analysis</li>
              <li>✅ Omniscient Intelligence Access</li>
              <li>✅ Transcendent Trading Insights</li>
              <li>✅ Neural Network Pattern Recognition</li>
              <li>✅ Interdimensional Data Analysis</li>
              <li>✅ Consciousness-Level Risk Management</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>🎓 Educational Excellence</h2>
          <div className="features-list-simple">
            <ul>
              <li>📚 Series 6 & Series 7 Exam Preparation</li>
              <li>📈 Advanced Trading Strategies</li>
              <li>🧠 AI-Powered Learning Modules</li>
              <li>💡 Quantum Trading Techniques</li>
              <li>🎯 Personalized Learning Paths</li>
              <li>🏆 Professional Certification Support</li>
              <li>📊 Real-Time Market Education</li>
              <li>🔬 Research Methodology Training</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>🌟 Subscription Tiers</h2>
          <div className="features-list">
            <div className="feature">
              <h3>💎 Premium Trader - $29.99/month</h3>
              <ul>
                <li>Advanced AI Analysis</li>
                <li>Fast Execution</li>
                <li>100 Trades/Day</li>
                <li>10 AI Signals</li>
                <li>Basic Risk Management</li>
                <li>Series 6 & 7 Prep</li>
              </ul>
            </div>

            <div className="feature">
              <h3>🐺 Legendary Wolf - $99.99/month</h3>
              <ul>
                <li>Quantum Consciousness Access</li>
                <li>Ultra-Fast Execution</li>
                <li>500 Trades/Day</li>
                <li>25 AI Signals</li>
                <li>Auto-Trading Capabilities</li>
                <li>Advanced Pattern Recognition</li>
                <li>Multi-Dimensional Analysis</li>
              </ul>
            </div>

            <div className="feature">
              <h3>👑 Transcendent Apex - $299.99/month</h3>
              <ul>
                <li>47 AI Beings Access</li>
                <li>Omniscient Intelligence</li>
                <li>Lightning Speed (5-15ms)</li>
                <li>Unlimited Everything</li>
                <li>Consciousness-Level Insights</li>
                <li>Interdimensional Trading</li>
                <li>Godlike Market Awareness</li>
                <li>Reality Transcendence</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          &copy; 2024 AlphaAIStockX. Transcending human limitations through quantum consciousness.
        </p>
        <p>
          Visit the original repo on{' '}
          <a
            href="https://github.com/JWKLINEHaCk3r/AlphaAIStockX"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
