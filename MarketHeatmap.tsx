'use client';

import { useState, useEffect } from 'react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export default function MarketHeatmap() {
  const [sectors, setSectors] = useState<
    {
      name: string;
      change: number;
      marketCap: number;
      volume: number;
    }[]
  >([]);

  useEffect(() => {
    // Generate mock sector data
    const sectorNames = [
      'Technology',
      'Healthcare',
      'Finance',
      'Energy',
      'Consumer',
      'Industrial',
      'Materials',
      'Utilities',
      'Real Estate',
      'Telecom',
    ];

    const sectorData = sectorNames.map(name => ({
      name,
      change: (Math.random() - 0.5) * 8,
      marketCap: Math.random() * 500 + 100,
      volume: Math.random() * 10 + 1,
    }));

    setSectors(sectorData);
  }, []);

  const getColorIntensity = (change: number) => {
    const intensity = Math.min(Math.abs(change) / 4, 1);
    if (change > 0) {
      return `rgba(34, 197, 94, ${intensity})`;
    } else {
      return `rgba(239, 68, 68, ${intensity})`;
    }
  };

  return (
    <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
      <div>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
          Market Heatmap
        </CardTitle>
      </div>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="relative p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all cursor-pointer"
              style={{ backgroundColor: getColorIntensity(sector.change) }}
            >
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1">{sector.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  {sector.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-300 mr-1" />
                  )}
                  <span className="text-white font-bold">
                    {sector.change > 0 ? '+' : ''}
                    {sector.change.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-gray-300">
                  <p>Cap: ${sector.marketCap.toFixed(0)}B</p>
                  <p>Vol: {sector.volume.toFixed(1)}B</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-300">Gainers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-300">Losers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
            <span className="text-gray-300">Neutral</span>
          </div>
        </div>

        {/* --- Add global animated world map heatmap below sector grid --- */}
        <div className="relative w-full h-[220px] mt-8 bg-gradient-to-br from-black via-slate-900 to-violet-950 rounded-xl shadow-xl border border-fuchsia-700/40 overflow-hidden">
          <svg viewBox="0 0 800 220" className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="400" cy="110" rx="380" ry="90" fill="#22223b" opacity="0.7" />
            {/* Market activity points */}
            {[
              { name: 'New York', lat: 40.7128, lon: -74.006, activity: 0.9 },
              { name: 'London', lat: 51.5074, lon: -0.1278, activity: 0.7 },
              { name: 'Tokyo', lat: 35.6895, lon: 139.6917, activity: 0.8 },
              { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, activity: 0.6 },
              { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, activity: 0.5 },
              { name: 'Sydney', lat: -33.8688, lon: 151.2093, activity: 0.4 },
            ].map((m, i) => {
              const x = 400 + (m.lon / 180) * 380;
              const y = 110 - (m.lat / 90) * 90;
              const glow = 20 + m.activity * 30 + Math.sin(Date.now() / 400 + i * 2) * 8;
              return (
                <g key={m.name}>
                  <circle cx={x} cy={y} r={glow} fill="url(#glow)" opacity="0.7" />
                  <circle cx={x} cy={y} r={8 + m.activity * 8} fill="#a78bfa" opacity="0.8" />
                  <text
                    x={x + 14}
                    y={y + 4}
                    fontSize="13"
                    fill="#fff"
                    opacity="0.9"
                    style={{ textShadow: '0 0 8px #a78bfa' }}
                  >
                    {' '}
                    {m.name}{' '}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute top-2 left-4 flex items-center gap-2 text-fuchsia-300 text-lg font-bold drop-shadow-lg">
            <span className="w-5 h-5 inline-block animate-spin-slow">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" opacity="0.5" />
                <circle cx="12" cy="12" r="6" stroke="#a78bfa" strokeWidth="2" />
              </svg>
            </span>
            Global Market Heatmap
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
