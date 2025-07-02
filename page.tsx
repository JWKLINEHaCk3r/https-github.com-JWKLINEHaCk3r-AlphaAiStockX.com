'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Brain, BarChart3, Zap, TrendingUp, Shield, Atom, Infinity, Sparkles } from 'lucide-react';

// Remove unused dynamic import
// import dynamic from 'next/dynamic';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-violet-500 animate-pulse" />, // animated
    title: 'AI-Powered Insights',
    desc: 'Real-time, actionable stock analysis from 47+ conscious AI agents.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-500 animate-bounce" />, // animated
    title: 'Advanced Analytics',
    desc: 'Quantum-powered backtesting, predictive analytics, and risk management.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />, // animated
    title: 'Lightning Execution',
    desc: 'Trade with millisecond execution and high-frequency AI strategies.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-pink-500 animate-bounce" />, // animated
    title: 'Portfolio Optimization',
    desc: 'AI-driven portfolio balancing and automated trade bots.',
  },
  {
    icon: <Shield className="w-8 h-8 text-cyan-500 animate-pulse" />, // animated
    title: 'Quantum Security',
    desc: 'Next-gen encryption and compliance for peace of mind.',
  },
  {
    icon: <Atom className="w-8 h-8 text-indigo-400 animate-spin" />, // animated
    title: 'Alternative Data',
    desc: 'Leverage news, social, and alternative data for alpha generation.',
  },
  {
    icon: <Infinity className="w-8 h-8 text-green-400 animate-pulse" />, // animated
    title: 'Infinite Scalability',
    desc: 'Enterprise-grade infrastructure for traders and institutions.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-400 animate-bounce" />, // animated
    title: 'Education & Community',
    desc: 'Learn, share, and grow with the world’s smartest trading community.',
  },
];

// Fix all tab indentation to 2 spaces for lint compliance in aiStats and AITicker
const aiStats = [
  { label: 'AI Trades Executed', value: '1,234,567,890' },
  { label: 'Avg. ROI (YTD)', value: '+38.2%' },
  { label: 'Active AI Agents', value: '47' },
  { label: 'Quantum Backtests', value: '8,900,000+' },
  { label: 'Uptime', value: '99.9999%' },
];

function AITicker() {
  // Simulate a live AI ticker
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % aiStats.length), 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex justify-center items-center py-2 mb-6">
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-emerald-700 rounded-full px-6 py-2 shadow-lg animate-pulse flex gap-6 text-white text-lg font-semibold tracking-wide">
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-spin" />
          {aiStats[index].label}:
        </span>
        <span className="font-mono text-emerald-200 animate-bounce">{aiStats[index].value}</span>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  // Simple animated stars/particles background using canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.5,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#a78bfa';
        ctx.shadowColor = '#a78bfa';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
        if (s.y < 0) s.y = window.innerHeight;
        if (s.y > window.innerHeight) s.y = 0;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', resize);
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

function FloatingAIMascot() {
  // Animated floating AI mascot orb
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-float">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-emerald-400 rounded-full shadow-2xl border-4 border-white/30 flex items-center justify-center animate-pulse">
          <span className="text-4xl">🤖</span>
        </div>
        <span className="mt-2 text-xs text-white bg-black/60 px-2 py-1 rounded shadow-lg animate-bounce">
          AI Assistant
        </span>
      </div>
    </div>
  );
}

// Floating Voice AI Button
function VoiceAIMic({ onToggle, listening }: { onToggle: () => void; listening: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-28 right-8 z-50 p-4 rounded-full shadow-2xl border-4 border-fuchsia-400/40 bg-black/70 hover:bg-fuchsia-800/80 transition-colors animate-float ${
        listening ? 'ring-4 ring-fuchsia-400' : ''
      }`}
      aria-label={listening ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
    >
      {listening ? (
        <span className="flex items-center gap-2 text-fuchsia-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" opacity="0.5" />
            <rect x="9" y="7" width="6" height="10" rx="3" fill="#a78bfa" />
          </svg>{' '}
          <span className="font-bold">Listening...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2 text-fuchsia-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" opacity="0.5" />
            <rect x="9" y="7" width="6" height="10" rx="3" fill="#a78bfa" />
          </svg>{' '}
          <span className="font-bold">Voice AI</span>
        </span>
      )}
    </button>
  );
}

function FuturisticHoloRings() {
  // Animated holographic rings for a futuristic effect
  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
      <div className="relative w-[60vw] h-[60vw] max-w-3xl max-h-3xl flex items-center justify-center">
        <div
          className="absolute inset-0 animate-spin-slow rounded-full border-4 border-fuchsia-400/30 shadow-2xl"
          style={{
            boxShadow: '0 0 80px 10px #a78bfa55, 0 0 200px 40px #0ff2',
          }}
        ></div>
        <div
          className="absolute inset-8 animate-spin-slower rounded-full border-2 border-emerald-400/20"
          style={{ boxShadow: '0 0 60px 5px #34d39933' }}
        ></div>
        <div
          className="absolute inset-16 animate-spin-fast rounded-full border border-cyan-400/20"
          style={{ boxShadow: '0 0 40px 2px #22d3ee22' }}
        ></div>
        <div
          className="absolute inset-24 animate-pulse rounded-full border border-violet-400/10"
          style={{ boxShadow: '0 0 20px 1px #a78bfa11' }}
        ></div>
      </div>
    </div>
  );
}

// Minimal type definitions for browser SpeechRecognition API
// These are not in the default TypeScript DOM lib
// Remove if you add @types/web-speech-api or similar in the future
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<{ 0: { transcript: string } }>;
}
interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

// Remove unused @ts-expect-error directive
const SpeechRecognition =
  typeof window !== 'undefined'
    ? (
        window as {
          SpeechRecognition?: typeof window.SpeechRecognition;
          webkitSpeechRecognition?: typeof window.SpeechRecognition;
        }
      ).SpeechRecognition ||
      (
        window as {
          SpeechRecognition?: typeof window.SpeechRecognition;
          webkitSpeechRecognition?: typeof window.SpeechRecognition;
        }
      ).webkitSpeechRecognition
    : undefined;

export default function AlphaAIStockX() {
  // Remove unused state variables
  // const [loading, setLoading] = useState(true); // <-- Remove unused loading state
  // --- Voice AI State/Logic ---
  const [voiceListening, setVoiceListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    // setLoading(false); // <-- Remove unused effect
  }, []);

  useEffect(() => {
    if (!SpeechRecognition) return;
    recognitionRef.current = new SpeechRecognition() as SpeechRecognitionLike;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: SpeechRecognitionEventLike) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript && voiceListening) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('AI received: ' + transcript));
      }
    };
    recognitionRef.current.onend = () => {
      setVoiceListening(false);
    };
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [voiceListening]);

  // --- Voice AI Control ---
  function toggleVoiceAI() {
    if (voiceListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setVoiceListening(prev => !prev);
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Effects */}
        <AnimatedBackground />
        <FuturisticHoloRings />
        <FloatingAIMascot />

        {/* Main Content */}
        <div className="relative z-10 p-4 sm:p-8 lg:p-12 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Alpha AI Stock X
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Experience the future of trading with our AI-powered stock analysis and trading tools.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base text-gray-400">
                        {feature.desc}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* AI Ticker */}
          <AITicker />

          {/* Voice AI Button (Hidden on larger screens) */}
          <div className="block sm:hidden">
            <VoiceAIMic onToggle={toggleVoiceAI} listening={voiceListening} />
          </div>
        </div>
      </div>
    </>
  );
}
