'use client';

import { useState } from 'react';
import { ntent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  BarChart3,
  GraduationCap,
  Bot,
  Eye,
  Activity,
  Award,
  Users,
  Globe,
  CheckCircle,
  Star,
  Atom,
  Database,
  Lock,
  BookOpen,
  DollarSign,
  Building,
  Crown,
  CloudLightningIcon as Lightning,
  Sparkles,
  Server,
  MessageSquare,
} from 'lucide-react';

export default function AboutContent({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [activeFeature, setActiveFeature] = useState('ai-analysis');

  const platformStats = {
    totalUsers: '50,000+',
    successRate: '94.7%',
    avgReturns: '23.4%',
    uptime: '99.99%',
    tradesExecuted: '2.5M+',
    aiModels: '47',
    dataPoints: '10B+',
    countries: '120+',
  };

  const coreFeatures = [
    {
      id: 'ai-analysis',
      title: 'Revolutionary AI Analysis',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      description: 'Advanced neural networks analyze market patterns with 94.7% accuracy',
      features: [
        '47 proprietary AI models working in parallel',
        'Real-time sentiment analysis from 10,000+ sources',
        'Pattern recognition across 150+ technical indicators',
        'Quantum-enhanced prediction algorithms',
        'Machine learning that adapts to market conditions',
        'Natural language processing for news analysis',
      ],
    },
    {
      id: 'education',
      title: 'Comprehensive Education Platform',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      description: 'Master trading with our world-class educational content',
      features: [
        'Complete Series 6 & 7 exam preparation',
        'Interactive practice tests with detailed explanations',
        'Video courses from industry experts',
        'Real-time market simulation environment',
        'Personalized learning paths based on your progress',
        'Certification tracking and progress analytics',
      ],
    },
    {
      id: 'trading-bots',
      title: 'Automated Trading Systems',
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      description: 'Lightning-fast automated trading with guaranteed performance',
      features: [
        'Ultra-fast execution (5-15ms latency)',
        '24/7 automated trading across global markets',
        'Risk management with stop-loss protection',
        'Multi-strategy portfolio optimization',
        'Options trading with advanced Greeks analysis',
        'Backtesting with 20+ years of historical data',
      ],
    },
    {
      id: 'security',
      title: 'Quantum-Grade Security',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Military-grade security protecting your investments',
      features: [
        'Post-quantum cryptography implementation',
        'Multi-factor authentication with biometrics',
        'End-to-end encryption for all transactions',
        'Real-time fraud detection and prevention',
        'Regulatory compliance (SEC, FINRA, CFTC)',
        'Insurance coverage up to $500M per account',
      ],
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics Suite',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      description: 'Professional-grade analytics and reporting tools',
      features: [
        'Real-time portfolio performance tracking',
        'Risk analysis with Monte Carlo simulations',
        'Tax optimization and loss harvesting',
        'Custom dashboard with 200+ widgets',
        'Advanced charting with 300+ indicators',
        'Institutional-grade research reports',
      ],
    },
    {
      id: 'scanners',
      title: 'AI-Powered Market Scanners',
      icon: Eye,
      color: 'from-indigo-500 to-purple-500',
      description: 'Discover opportunities with intelligent market scanning',
      features: [
        'Real-time stock screening across 50,000+ securities',
        'Options flow analysis with unusual activity alerts',
        'Earnings prediction with 89% accuracy rate',
        'Sector rotation AI for market timing',
        'Pattern recognition for 150+ chart formations',
        'Social sentiment tracking from 1M+ sources',
      ],
    },
  ];

  const technologyStack = [
    {
      category: 'AI & Machine Learning',
      icon: Brain,
      technologies: [
        'TensorFlow & PyTorch for deep learning',
        'Custom neural networks for market prediction',
        'Reinforcement learning for strategy optimization',
        'Natural language processing for sentiment analysis',
        'Computer vision for chart pattern recognition',
        'Quantum computing integration for complex calculations',
      ],
    },
    {
      category: 'Infrastructure',
      icon: Server,
      technologies: [
        'Cloud-native architecture on AWS/Azure',
        'Kubernetes orchestration for scalability',
        'Redis for ultra-fast data caching',
        'PostgreSQL with time-series optimization',
        'Apache Kafka for real-time data streaming',
        'CDN with global edge locations',
      ],
    },
    {
      category: 'Security',
      icon: Lock,
      technologies: [
        'Post-quantum cryptography algorithms',
        'Zero-trust security architecture',
        'Hardware security modules (HSM)',
        'Multi-party computation protocols',
        'Blockchain-based audit trails',
        'Advanced threat detection systems',
      ],
    },
    {
      category: 'Data & Analytics',
      icon: Database,
      technologies: [
        'Real-time market data from 50+ exchanges',
        'Alternative data from satellite imagery',
        'Social media sentiment analysis',
        'Economic indicators and macro data',
        'Corporate earnings and financial statements',
        'Options flow and institutional activity',
      ],
    },
  ];

  const successStories = [
    {
      name: 'Sarah Chen',
      role: 'Day Trader',
      avatar: 'SC',
      story:
        "Increased my win rate from 45% to 78% using AlphaAI's pattern recognition. Made $127K in 6 months!",
      returns: '+340%',
      timeframe: '6 months',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Portfolio Manager',
      avatar: 'MR',
      story:
        'The AI analysis helped me identify market trends 3 weeks before they happened. Incredible accuracy!',
      returns: '+156%',
      timeframe: '1 year',
    },
    {
      name: 'Jennifer Park',
      role: 'Options Trader',
      avatar: 'JP',
      story:
        "The options flow scanner is a game-changer. I'm now consistently profitable with 85% win rate.",
      returns: '+289%',
      timeframe: '8 months',
    },
    {
      name: 'David Thompson',
      role: 'Swing Trader',
      avatar: 'DT',
      story:
        'Passed my Series 7 exam with 94% thanks to their education platform. Now managing $2M portfolio.',
      returns: '+198%',
      timeframe: '2 years',
    },
  ];

  const companyMilestones = [
    { year: '2020', event: 'Founded by former Goldman Sachs quants', icon: Building },
    { year: '2021', event: 'Launched first AI trading algorithm', icon: Brain },
    { year: '2022', event: 'Reached 10,000 active users', icon: Users },
    { year: '2023', event: 'Introduced quantum-resistant security', icon: Shield },
    { year: '2024', event: '50,000+ users, $2.5B+ in trades executed', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl"></div>
        <Card className="relative bg-slate-900/50 backdrop-blur-xl border-2 border-blue-500/30">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Atom className="h-20 w-20 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 h-20 w-20 bg-blue-400/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              AlphaAIStockX
            </h1>
            <p className="text-2xl text-slate-300 mb-6 max-w-4xl mx-auto">
              The World's Most Advanced AI-Powered Trading & Education Platform
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
              Combining cutting-edge artificial intelligence, quantum computing, and decades of Wall
              Street expertise to revolutionize how you trade, learn, and succeed in financial
              markets.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                94.7% Success Rate
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-lg">
                <Users className="h-5 w-5 mr-2" />
                50,000+ Active Users
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
                <DollarSign className="h-5 w-5 mr-2" />
                $2.5B+ Trades Executed
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('education')}>
                <GraduationCap className="h-5 w-5 mr-2" />
                Explore Education
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(platformStats).map(([key, value]) => {
          const statConfig = {
            totalUsers: { icon: Users, label: 'Active Users', color: 'text-blue-400' },
            successRate: { icon: Target, label: 'Success Rate', color: 'text-green-400' },
            avgReturns: { icon: TrendingUp, label: 'Avg Returns', color: 'text-purple-400' },
            uptime: { icon: Activity, label: 'Uptime', color: 'text-cyan-400' },
            tradesExecuted: { icon: BarChart3, label: 'Trades Executed', color: 'text-yellow-400' },
            aiModels: { icon: Brain, label: 'AI Models', color: 'text-pink-400' },
            dataPoints: { icon: Database, label: 'Data Points', color: 'text-orange-400' },
            countries: { icon: Globe, label: 'Countries', color: 'text-emerald-400' },
          };
          const config = statConfig[key];
          const IconComponent = config.icon;

          return (
            <Card
              key={key}
              className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <IconComponent className={`h-8 w-8 mx-auto mb-3 ${config.color}`} />
                <div className={`text-2xl font-bold ${config.color} mb-1`}>{value}</div>
                <div className="text-slate-400 text-sm">{config.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Core Features */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center mb-2">
            Revolutionary Features
          </CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
            Discover why AlphaAIStockX is the most advanced trading platform ever created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeFeature} onValueChange={setActiveFeature}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-slate-800/50">
              {coreFeatures.map(feature => {
                const IconComponent = feature.icon;
                return (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-purple-500/20"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{feature.title.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {coreFeatures.map(feature => {
              const IconComponent = feature.icon;
              return (
                <TabsContent key={feature.id} value={feature.id} className="space-y-6">
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4`}
                    >
                      <IconComponent className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                      {feature.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.features.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center mb-2">
            Cutting-Edge Technology
          </CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
            Built with the most advanced technologies available today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technologyStack.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">{category.category}</h4>
                  </div>
                  <div className="space-y-2">
                    {category.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg"
                      >
                        <Sparkles className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-slate-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center mb-2">Success Stories</CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
            Real results from real traders using AlphaAIStockX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-600/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {story.avatar}
                    </div>
                    <div>
                      <h5 className="font-bold text-white">{story.name}</h5>
                      <p className="text-slate-400 text-sm">{story.role}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-green-400 font-bold text-lg">{story.returns}</div>
                      <div className="text-slate-400 text-sm">{story.timeframe}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{story.story}"</p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Timeline */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center mb-2">Our Journey</CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
            From startup to the world's leading AI trading platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-8">
              {companyMilestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={index} className="relative flex items-center gap-6">
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{milestone.year}</div>
                      <div className="text-lg text-white">{milestone.event}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Us */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center mb-2">
            Why AlphaAIStockX is Amazing
          </CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
            The reasons why we're revolutionizing the trading industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lightning,
                title: 'Lightning Fast',
                description: '5-15ms execution speed beats 99% of competitors',
                color: 'text-yellow-400',
              },
              {
                icon: Brain,
                title: 'AI Superiority',
                description: '47 AI models working together for maximum accuracy',
                color: 'text-blue-400',
              },
              {
                icon: Shield,
                title: 'Quantum Security',
                description: 'Post-quantum cryptography protects your investments',
                color: 'text-green-400',
              },
              {
                icon: GraduationCap,
                title: 'Complete Education',
                description: 'From beginner to Series 7 certified professional',
                color: 'text-purple-400',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Access to 50+ exchanges across 120+ countries',
                color: 'text-cyan-400',
              },
              {
                icon: Award,
                title: 'Proven Results',
                description: '94.7% success rate with $2.5B+ in executed trades',
                color: 'text-orange-400',
              },
            ].map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <div key={index} className="text-center p-6 bg-slate-800/30 rounded-lg">
                  <IconComponent className={`h-12 w-12 mx-auto mb-4 ${reason.color}`} />
                  <h4 className="text-xl font-bold text-white mb-2">{reason.title}</h4>
                  <p className="text-slate-300">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 backdrop-blur-xl">
        <CardContent className="p-12 text-center">
          <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Trading?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ successful traders who are already using AlphaAIStockX to maximize their
            profits and master the markets with AI-powered precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4"
            >
              <Rocket className="h-6 w-6 mr-2" />
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4"
              onClick={() => onNavigate('education')}
            >
              <BookOpen className="h-6 w-6 mr-2" />
              Explore Education
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <MessageSquare className="h-6 w-6 mr-2" />
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
