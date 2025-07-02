'use client';

import { useState, useEffect, useRef } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Brain,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
} from 'lucide-react';

export default function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [aiPersonality, setAiPersonality] = useState('professional');

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = event => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Add initial greeting
    addToConversation(
      'assistant',
      "Hello! I'm your AI trading assistant. Ask me about market analysis, stock recommendations, or trading strategies. You can speak to me or type your questions."
    );

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = async command => {
    addToConversation('user', command);

    // Simulate AI processing
    const aiResponse = await generateAIResponse(command.toLowerCase());
    addToConversation('assistant', aiResponse);

    if (voiceEnabled) {
      speakResponse(aiResponse);
    }
  };

  const generateAIResponse = async command => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // AI response logic based on command
    if (command.includes('price') || command.includes('stock')) {
      const stocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];
      const stock = stocks[Math.floor(Math.random() * stocks.length)];
      const price = (100 + Math.random() * 400).toFixed(2);
      const change = ((Math.random() - 0.5) * 10).toFixed(2);
      return `${stock} is currently trading at $${price}, ${change >= 0 ? 'up' : 'down'} ${Math.abs(change)}% today. Based on my neural network analysis, I see ${change >= 0 ? 'bullish' : 'bearish'} momentum with 85% confidence.`;
    }

    if (command.includes('market') || command.includes('outlook')) {
      const sentiment = Math.random() > 0.5 ? 'bullish' : 'bearish';
      const confidence = (70 + Math.random() * 30).toFixed(0);
      return `Current market sentiment is ${sentiment} with ${confidence}% confidence. My quantum AI analysis shows strong momentum in the technology sector, with volatility expected to remain moderate over the next 5 trading days.`;
    }

    if (command.includes('buy') || command.includes('sell') || command.includes('trade')) {
      return `Based on my deep learning models, I recommend a diversified approach. Consider dollar-cost averaging into high-quality growth stocks. My pattern recognition system has identified several bullish setups in the semiconductor and cloud computing sectors.`;
    }

    if (command.includes('portfolio') || command.includes('allocation')) {
      return `For optimal portfolio allocation, I suggest 60% equities, 25% bonds, 10% alternatives, and 5% cash. My risk analysis indicates this provides the best risk-adjusted returns based on current market conditions and your risk profile.`;
    }

    if (command.includes('risk') || command.includes('volatility')) {
      const riskLevel = ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)];
      return `Current market risk is ${riskLevel}. My volatility prediction models show expected VIX levels between 15-25 over the next month. I recommend implementing stop-loss orders and position sizing based on the Kelly Criterion.`;
    }

    // Default response
    const responses = [
      "I'm analyzing that information using my quantum neural networks. Could you be more specific about what you'd like to know?",
      'My AI models are processing your request. I can help with market analysis, stock recommendations, risk assessment, and trading strategies.',
      'Based on my deep learning algorithms, I need more context to provide the most accurate analysis. What specific aspect of trading interests you?',
      "I'm here to help with your trading decisions using advanced AI. Ask me about technical analysis, fundamental analysis, or market predictions.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakResponse = text => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice characteristics based on personality
      utterance.rate = aiPersonality === 'energetic' ? 1.2 : 0.9;
      utterance.pitch = aiPersonality === 'friendly' ? 1.1 : 1.0;
      utterance.volume = 0.8;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    }
  };

  const addToConversation = (role, message) => {
    const newMessage = {
      id: Date.now(),
      role,
      message,
      timestamp: new Date(),
    };
    setConversation(prev => [newMessage, ...prev.slice(0, 19)]); // Keep last 20 messages
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Assistant Control Panel */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-indigo-400" />
            AI Voice Assistant
            <Badge className="ml-3 bg-gradient-to-r from-indigo-500 to-purple-500">
              <Brain className="h-3 w-3 mr-1" />
              Neural Voice AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Voice Controls */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Voice Controls</h4>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  disabled={isSpeaking}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Listening
                    </>
                  )}
                </Button>

                <Button
                  onClick={toggleVoice}
                  variant="outline"
                  className={`w-full ${voiceEnabled ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}
                >
                  {voiceEnabled ? (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Voice Enabled
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4 mr-2" />
                      Voice Disabled
                    </>
                  )}
                </Button>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">AI Personality</label>
                  <select
                    value={aiPersonality}
                    onChange={e => setAiPersonality(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/30 border border-indigo-500/30 rounded text-white"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="energetic">Energetic</option>
                    <option value="calm">Calm & Analytical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status Display */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Status</h4>

              <div className="space-y-3">
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400">Listening</span>
                    <Badge className={isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}>
                      {isListening ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">Speaking</span>
                    <Badge className={isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-500'}>
                      {isSpeaking ? 'SPEAKING' : 'READY'}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">Voice Output</span>
                    <Badge className={voiceEnabled ? 'bg-green-500' : 'bg-red-500'}>
                      {voiceEnabled ? 'ENABLED' : 'DISABLED'}
                    </Badge>
                  </div>
                </div>
              </div>

              {transcript && (
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-400 text-sm font-medium mb-1">Live Transcript:</p>
                  <p className="text-white text-sm">{transcript}</p>
                </div>
              )}
            </div>

            {/* Quick Commands */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Commands</h4>

              <div className="space-y-2">
                {[
                  { text: "What's the market outlook?", icon: TrendingUp },
                  { text: 'Analyze AAPL stock', icon: BarChart3 },
                  { text: 'Show me portfolio allocation', icon: Target },
                  { text: "What's the current risk level?", icon: Activity },
                ].map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => processVoiceCommand(command.text)}
                    className="w-full justify-start border-indigo-500/30 text-indigo-400 hover:text-white"
                  >
                    <command.icon className="h-4 w-4 mr-2" />
                    {command.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <Card className="bg-gradient-to-r from-gray-900/20 to-slate-900/20 border-gray-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-gray-400" />
            Conversation History
            <Badge className="ml-3 bg-gradient-to-r from-gray-500 to-slate-500">
              <Zap className="h-3 w-3 mr-1" />
              AI Chat Log
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {conversation.map(message => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500/10 border border-blue-500/30 ml-8'
                    : 'bg-green-500/10 border border-green-500/30 mr-8'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}
                  >
                    {message.role === 'user' ? (
                      <Mic className="h-4 w-4 text-white" />
                    ) : (
                      <Brain className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-semibold ${message.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}
                      >
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
