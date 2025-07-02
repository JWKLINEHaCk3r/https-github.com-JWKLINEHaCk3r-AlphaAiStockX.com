'use client';

import React from 'react';
import { getAccount, getPositions } from '../../services/alpaca-service';
import { strategies, AITradingStrategy } from '../../services/ai-strategy-engine';

export default function AITradeCopilotFuturistic() {
  const [running, setRunning] = React.useState(false);
  const [log, setLog] = React.useState<string[]>([]);
  const [pnl, setPnl] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<string>('Idle');
  const [selectedStrategy, setSelectedStrategy] = React.useState<AITradingStrategy>(strategies[0]);
  const [confidence, setConfidence] = React.useState<number | null>(null);
  const [aiReason, setAiReason] = React.useState<string>('');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      setStatus('Running');
      setLog(l => ['AI Bot started.', ...l]);
      interval = setInterval(async () => {
        try {
          const account = await getAccount();
          const positions = await getPositions();
          const marketData = { volatility: Math.random() * 0.6 };
          setPnl(Number(account?.equity) - Number(account?.last_equity || account?.equity));
          // Run selected AI strategy
          const result = await selectedStrategy.run(marketData, { ...account, ...positions });
          setConfidence(result.confidence);
          setAiReason(result.reason);
          setLog(l => [
            `[${selectedStrategy.name}] Action: ${result.action} | Confidence: ${result.confidence.toFixed(2)} | ${result.reason}`,
            ...l,
          ]);
        } catch (e) {
          setLog(l => ['Error: ' + ((e as Error)?.message || e), ...l]);
        }
      }, 4000);
    } else {
      setStatus('Idle');
    }
    return () => clearInterval(interval);
  }, [running, selectedStrategy]);

  return (
    <div className="glassmorphic neon-border rounded-2xl p-8 shadow-2xl flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-fuchsia-300 drop-shadow">
          AI Trade Copilot <span className="text-cyan-400">Futuristic</span>
        </h3>
        <button
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${running ? 'bg-red-600 text-white' : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'}`}
          onClick={() => setRunning(r => !r)}
        >
          {running ? 'Stop' : 'Start'} Bot
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="strategy-select" className="text-fuchsia-200 font-semibold">
          Strategy:
        </label>
        <select
          id="strategy-select"
          className="bg-black/40 text-fuchsia-200 rounded-lg px-4 py-2"
          value={selectedStrategy.name}
          onChange={e => {
            const strat = strategies.find(s => s.name === e.target.value);
            if (strat) setSelectedStrategy(strat);
          }}
        >
          {strategies.map(s => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        Status: <span className="font-semibold text-cyan-300">{status}</span>
      </div>
      <div>
        P&L:{' '}
        <span className="font-semibold text-green-400">
          {pnl !== null ? `$${pnl.toFixed(2)}` : '-'}
        </span>
      </div>
      <div>
        AI Confidence:{' '}
        <span className="font-semibold text-yellow-300">
          {confidence !== null ? `${(confidence * 100).toFixed(1)}%` : '-'}
        </span>
      </div>
      <div className="text-fuchsia-200">
        AI Reason: <span className="text-white">{aiReason}</span>
      </div>
      <div className="bg-black/40 rounded-xl p-3 text-xs h-40 overflow-y-auto neon-scrollbar">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="text-fuchsia-200 text-xs mt-2 italic">
        * This is a next-gen AI bot. For real trading, connect your live API keys and enable
        production mode. All actions are logged and risk-managed.
      </div>
    </div>
  );
}
