import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import type { Config } from 'tailwindcss';
import { dataAggregationService } from './app/services/data-aggregation-service';
import { marketDataService } from './app/services/market-data-service';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export { Button, buttonVariants };
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export class AIBrainService {
  /**
   * Holds the singleton instance of the {@link AIBrainService}.
   * Used to ensure only one instance of the service exists throughout the application.
   * @private
   * @static
   */
  private static instance: AIBrainService | undefined = undefined;
  private neuralNetwork: Map<string, any> = new Map();
  private learningHistory: any[] = [];
  private decisionTree: Map<string, any> = new Map();
  private confidenceThreshold = 0.75;

  static getInstance(): AIBrainService {
    if (!AIBrainService.instance) {
      AIBrainService.instance = new AIBrainService();
    }
    return AIBrainService.instance;
  }

  async initialize() {
    await dataAggregationService.initializeDataSources();
    this.buildNeuralNetwork();
    this.initializeDecisionTree();
    this.startContinuousLearning();
  }

  // Advanced Neural Network for Trading Decisions
  private buildNeuralNetwork() {
    const layers = {
      input: {
        nodes: 50, // Technical, fundamental, sentiment, news, economic inputs
        weights: this.generateRandomWeights(50),
      },
      hidden1: {
        nodes: 30,
        weights: this.generateRandomWeights(30),
        activation: 'relu',
      },
      hidden2: {
        nodes: 20,
        weights: this.generateRandomWeights(20),
        activation: 'relu',
      },
      output: {
        nodes: 3, // BUY, SELL, HOLD
        weights: this.generateRandomWeights(3),
        activation: 'softmax',
      },
    };

    this.neuralNetwork.set('trading_network', layers);
  }

  private generateRandomWeights(size: number) {
    return Array.from({ length: size }, () => Math.random() * 2 - 1);
  }

  private initializeDecisionTree() {
    const decisionRules = {
      market_conditions: {
        bullish: {
          sentiment_threshold: 0.7,
          volume_threshold: 1.2,
          momentum_threshold: 0.6,
          action: 'AGGRESSIVE_BUY',
        },
        bearish: {
          sentiment_threshold: 0.3,
          volume_threshold: 0.8,
          momentum_threshold: 0.4,
          action: 'DEFENSIVE_SELL',
        },
        neutral: {
          sentiment_threshold: 0.5,
          volume_threshold: 1.0,
          momentum_threshold: 0.5,
          action: 'SELECTIVE_TRADE',
        },
      },
      risk_management: {
        high_volatility: {
          position_size: 0.5, // Reduce position size
          stop_loss: 0.05, // Tighter stops
          take_profit: 0.08,
        },
        low_volatility: {
          position_size: 1.0, // Normal position size
          stop_loss: 0.08,
          take_profit: 0.15,
        },
      },
      pattern_recognition: {
        strong_patterns: {
          confidence_boost: 0.2,
          position_multiplier: 1.5,
        },
        weak_patterns: {
          confidence_reduction: 0.1,
          position_multiplier: 0.8,
        },
      },
    };

    Object.entries(decisionRules).forEach(([key, rules]) => {
      this.decisionTree.set(key, rules);
    });
  }

  // Comprehensive Analysis Engine
  async analyzeAndDecide(symbol: string) {
    try {
      // Gather all available data
      const comprehensiveData = await this.gatherComprehensiveData(symbol);

      // Process through neural network
      const neuralPrediction = await this.processNeuralNetwork(comprehensiveData);

      // Apply decision tree logic
      const decisionTreeResult = await this.applyDecisionTree(comprehensiveData);

      // Combine multiple AI approaches
      const combinedDecision = await this.combineDecisions(
        neuralPrediction,
        decisionTreeResult,
        comprehensiveData
      );

      // Generate final recommendation
      const finalRecommendation = await this.generateFinalRecommendation(
        combinedDecision,
        comprehensiveData
      );

      // Learn from decision
      this.learnFromDecision(comprehensiveData, finalRecommendation);

      return finalRecommendation;
    } catch (error) {
      console.error('AI Brain analysis error:', error);
      return this.generateFallbackRecommendation(symbol);
    }
  }

  private async gatherComprehensiveData(symbol: string) {
    const [marketData, aggregatedAnalysis, marketOverview, tradingSignals] = await Promise.all([
      marketDataService.getMarketData(symbol),
      dataAggregationService.getComprehensiveAnalysis(symbol),
      dataAggregationService.getMarketOverview(),
      marketDataService.calculateTradingSignals(symbol, {}),
    ]);

    return {
      symbol,
      timestamp: new Date(),
      marketData,
      aggregatedAnalysis,
      marketOverview,
      tradingSignals,

      // Processed features for neural network
      features: this.extractFeatures({
        marketData,
        aggregatedAnalysis,
        marketOverview,
        tradingSignals,
      }),
    };
  }

  private extractFeatures(data: any) {
    const features = [];

    // Market data features (10 features)
    features.push(
      data.marketData.price || 0,
      data.marketData.volume || 0,
      data.marketData.change || 0,
      data.marketData.changePercent || 0,
      data.marketData.technicals?.rsi || 50,
      data.marketData.technicals?.macd?.line || 0,
      data.marketData.technicals?.atr || 0,
      data.marketData.technicals?.adx || 25,
      data.marketData.technicals?.bollinger?.upper || 0,
      data.marketData.technicals?.bollinger?.lower || 0
    );

    // Sentiment features (5 features)
    features.push(
      data.aggregatedAnalysis.sentimentAnalysis?.overall || 50,
      data.aggregatedAnalysis.sentimentAnalysis?.bullish || 50,
      data.aggregatedAnalysis.sentimentAnalysis?.bearish || 50,
      data.aggregatedAnalysis.newsAnalysis?.sentimentScore || 0.5,
      data.aggregatedAnalysis.newsAnalysis?.impactScore || 0.5
    );

    // Fundamental features (10 features)
    features.push(
      data.aggregatedAnalysis.fundamentalAnalysis?.pe || 20,
      data.aggregatedAnalysis.fundamentalAnalysis?.pb || 2,
      data.aggregatedAnalysis.fundamentalAnalysis?.roe || 0.15,
      data.aggregatedAnalysis.fundamentalAnalysis?.debtEquity || 0.5,
      data.aggregatedAnalysis.fundamentalAnalysis?.revenue || 0,
      data.aggregatedAnalysis.fundamentalAnalysis?.growth || 0,
      data.aggregatedAnalysis.fundamentalAnalysis?.margins?.gross || 0.3,
      data.aggregatedAnalysis.fundamentalAnalysis?.margins?.net || 0.1,
      data.marketData.fundamentals?.freeCashFlow || 0,
      data.marketData.fundamentals?.currentRatio || 1.5
    );

    // Technical features (10 features)
    features.push(
      data.aggregatedAnalysis.technicalAnalysis?.rsi || 50,
      data.aggregatedAnalysis.technicalAnalysis?.macd?.line || 0,
      data.aggregatedAnalysis.technicalAnalysis?.macd?.signal || 0,
      data.aggregatedAnalysis.technicalAnalysis?.support || 0,
      data.aggregatedAnalysis.technicalAnalysis?.resistance || 0,
      data.aggregatedAnalysis.technicalAnalysis?.trend === 'bullish' ? 1 : 0,
      data.aggregatedAnalysis.technicalAnalysis?.momentum === 'positive' ? 1 : 0,
      data.aggregatedAnalysis.patternAnalysis?.confidence || 0,
      data.aggregatedAnalysis.patternAnalysis?.reliability || 0,
      data.aggregatedAnalysis.correlationAnalysis?.spyCorrelation || 0.5
    );

    // Market condition features (10 features)
    features.push(
      data.marketOverview.marketSentiment?.score || 50,
      data.marketOverview.riskLevel === 'HIGH'
        ? 1
        : data.marketOverview.riskLevel === 'MEDIUM'
          ? 0.5
          : 0,
      data.aggregatedAnalysis.optionsAnalysis?.impliedVolatility || 0.3,
      data.aggregatedAnalysis.optionsAnalysis?.putCallRatio || 1,
      data.aggregatedAnalysis.optionsAnalysis?.unusualActivity ? 1 : 0,
      data.aggregatedAnalysis.economicImpact?.overallImpact || 0,
      data.aggregatedAnalysis.seasonalityAnalysis?.historicalPerformance?.q1 || 0,
      data.aggregatedAnalysis.riskAssessment?.volatility || 0.2,
      data.aggregatedAnalysis.riskAssessment?.beta || 1,
      data.tradingSignals.confidence || 0.5
    );

    // Trading signals features (5 features)
    features.push(
      data.tradingSignals.signal || 0,
      data.tradingSignals.strength || 0,
      data.tradingSignals.components?.momentum?.strength || 0,
      data.tradingSignals.components?.breakout?.strength || 0,
      data.tradingSignals.components?.sentiment?.strength || 0
    );

    // Ensure we have exactly 50 features
    while (features.length < 50) {
      features.push(0);
    }

    return features.slice(0, 50);
  }

  private async processNeuralNetwork(data: any) {
    const network = this.neuralNetwork.get('trading_network');
    const features = data.features;

    // Forward pass through neural network
    const layer1Output = this.activateLayer(features, network.input.weights, 'linear');
    const layer2Output = this.activateLayer(layer1Output, network.hidden1.weights, 'relu');
    const layer3Output = this.activateLayer(layer2Output, network.hidden2.weights, 'relu');
    const finalOutput = this.activateLayer(layer3Output, network.output.weights, 'softmax');

    // Interpret output [BUY, SELL, HOLD]
    const maxIndex = finalOutput.indexOf(Math.max(...finalOutput));
    const actions = ['BUY', 'SELL', 'HOLD'];
    const confidence = Math.max(...finalOutput);

    return {
      action: actions[maxIndex],
      confidence: confidence,
      probabilities: {
        buy: finalOutput[0],
        sell: finalOutput[1],
        hold: finalOutput[2],
      },
      rawOutput: finalOutput,
    };
  }

  private activateLayer(inputs: number[], weights: number[], activation: string) {
    const outputs = [];

    for (let i = 0; i < weights.length; i++) {
      let sum = 0;
      for (let j = 0; j < inputs.length; j++) {
        sum += inputs[j] * (weights[i] || Math.random() - 0.5);
      }

      // Apply activation function
      switch (activation) {
        case 'relu':
          outputs.push(Math.max(0, sum));
          break;
        case 'sigmoid':
          outputs.push(1 / (1 + Math.exp(-sum)));
          break;
        case 'softmax':
          outputs.push(Math.exp(sum)); // Will normalize later
          break;
        default:
          outputs.push(sum);
      }
    }

    // Normalize softmax
    if (activation === 'softmax') {
      const sum = outputs.reduce((a, b) => a + b, 0);
      return outputs.map(x => x / sum);
    }

    return outputs;
  }

  private async applyDecisionTree(data: any) {
    const marketConditions = this.decisionTree.get('market_conditions');
    const riskManagement = this.decisionTree.get('risk_management');
    const patternRecognition = this.decisionTree.get('pattern_recognition');

    // Determine market condition
    const sentiment = data.aggregatedAnalysis.sentimentAnalysis?.overall || 50;
    const volume = data.marketData.volume || 1;
    const avgVolume = data.marketData.avgVolume || 1;
    const volumeRatio = volume / avgVolume;

    let marketCondition = 'neutral';
    if (sentiment > 70 && volumeRatio > 1.2) {
      marketCondition = 'bullish';
    } else if (sentiment < 30 && volumeRatio < 0.8) {
      marketCondition = 'bearish';
    }

    // Apply market condition rules
    const conditionRules = marketConditions[marketCondition];

    // Determine volatility level
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    const volatilityLevel = volatility > 0.3 ? 'high_volatility' : 'low_volatility';
    const riskRules = riskManagement[volatilityLevel];

    // Pattern strength
    const patternConfidence = data.aggregatedAnalysis.patternAnalysis?.confidence || 0;
    const patternStrength = patternConfidence > 0.7 ? 'strong_patterns' : 'weak_patterns';
    const patternRules = patternRecognition[patternStrength];

    return {
      marketCondition,
      action: conditionRules.action,
      riskAdjustment: riskRules,
      patternAdjustment: patternRules,
      confidence: this.calculateDecisionTreeConfidence(data, conditionRules),
    };
  }

  private calculateDecisionTreeConfidence(data: any, rules: any) {
    let confidence = 0.5;

    // Sentiment alignment
    const sentiment = data.aggregatedAnalysis.sentimentAnalysis?.overall || 50;
    if (sentiment > rules.sentiment_threshold * 100) {
      confidence += 0.2;
    }

    // Volume confirmation
    const volume = data.marketData.volume || 1;
    const avgVolume = data.marketData.avgVolume || 1;
    const volumeRatio = volume / avgVolume;
    if (volumeRatio > rules.volume_threshold) {
      confidence += 0.15;
    }

    // Technical momentum
    const momentum = data.aggregatedAnalysis.technicalAnalysis?.momentum === 'positive' ? 0.8 : 0.2;
    if (momentum > rules.momentum_threshold) {
      confidence += 0.15;
    }

    return Math.min(confidence, 1.0);
  }

  private async combineDecisions(neuralPrediction: any, decisionTreeResult: any, data: any) {
    // Weight the different approaches
    const neuralWeight = 0.6;
    const decisionTreeWeight = 0.4;

    // Combine confidence scores
    const combinedConfidence =
      neuralPrediction.confidence * neuralWeight +
      decisionTreeResult.confidence * decisionTreeWeight;

    // Determine final action
    let finalAction = 'HOLD';

    if (neuralPrediction.action === decisionTreeResult.action) {
      // Both agree - high confidence
      finalAction = neuralPrediction.action;
    } else {
      // Disagreement - use higher confidence
      finalAction =
        neuralPrediction.confidence > decisionTreeResult.confidence
          ? neuralPrediction.action
          : decisionTreeResult.action;
    }

    // Apply additional filters
    const filteredDecision = this.applyAdditionalFilters(finalAction, combinedConfidence, data);

    return {
      action: filteredDecision.action,
      confidence: filteredDecision.confidence,
      neuralPrediction,
      decisionTreeResult,
      reasoning: this.generateReasoning(neuralPrediction, decisionTreeResult, data),
    };
  }

  private applyAdditionalFilters(action: string, confidence: number, data: any) {
    let filteredAction = action;
    let filteredConfidence = confidence;

    // Risk filter - don't trade if confidence too low
    if (confidence < this.confidenceThreshold) {
      filteredAction = 'HOLD';
      filteredConfidence = confidence * 0.8;
    }

    // Volatility filter - reduce position in high volatility
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    if (volatility > 0.4) {
      filteredConfidence *= 0.8;
    }

    // News filter - check for major news impact
    const newsImpact = data.aggregatedAnalysis.newsAnalysis?.impactScore || 0;
    if (newsImpact > 0.8) {
      // Major news - be more cautious
      filteredConfidence *= 0.9;
    }

    // Market condition filter
    const marketRisk = data.marketOverview.riskLevel;
    if (marketRisk === 'HIGH') {
      filteredConfidence *= 0.7;
    }

    return {
      action: filteredAction,
      confidence: filteredConfidence,
    };
  }

  private generateReasoning(neuralPrediction: any, decisionTreeResult: any, data: any) {
    const reasons = [];

    // Neural network reasoning
    if (neuralPrediction.confidence > 0.7) {
      reasons.push(
        `AI Neural Network shows ${neuralPrediction.confidence.toFixed(2)} confidence for ${neuralPrediction.action}`
      );
    }

    // Decision tree reasoning
    reasons.push(
      `Market conditions suggest ${decisionTreeResult.action} based on ${decisionTreeResult.marketCondition} environment`
    );

    // Technical reasoning
    const rsi = data.aggregatedAnalysis.technicalAnalysis?.rsi;
    if (rsi < 30) {
      reasons.push('RSI indicates oversold conditions');
    } else if (rsi > 70) {
      reasons.push('RSI indicates overbought conditions');
    }

    // Sentiment reasoning
    const sentiment = data.aggregatedAnalysis.sentimentAnalysis?.overall;
    if (sentiment > 70) {
      reasons.push('Strong bullish sentiment detected');
    } else if (sentiment < 30) {
      reasons.push('Strong bearish sentiment detected');
    }

    // Pattern reasoning
    const patterns = data.aggregatedAnalysis.patternAnalysis?.activePatterns || [];
    if (patterns.length > 0) {
      reasons.push(`Technical patterns detected: ${patterns.map(p => p.name).join(', ')}`);
    }

    // News reasoning
    const newsImpact = data.aggregatedAnalysis.newsAnalysis?.impactScore;
    if (newsImpact > 0.7) {
      reasons.push('Significant news impact detected');
    }

    return reasons;
  }

  private async generateFinalRecommendation(decision: any, data: any) {
    const recommendation = {
      symbol: data.symbol,
      timestamp: new Date(),

      // Core recommendation
      action: decision.action,
      confidence: decision.confidence,
      strength: this.calculateStrength(decision, data),

      // Price targets and risk management
      priceTargets: this.calculatePriceTargets(data, decision),
      riskManagement: this.calculateRiskManagement(data, decision),

      // Position sizing
      positionSizing: this.calculatePositionSizing(data, decision),

      // Timing
      timeframe: this.determineTimeframe(decision, data),
      urgency: this.determineUrgency(decision, data),

      // Supporting analysis
      reasoning: decision.reasoning,
      supportingFactors: this.identifySupportingFactors(data),
      riskFactors: this.identifyRiskFactors(data),

      // AI insights
      aiInsights: {
        neuralNetworkPrediction: decision.neuralPrediction,
        decisionTreeResult: decision.decisionTreeResult,
        dataQuality: this.assessDataQuality(data),
        modelConfidence: decision.confidence,
      },

      // Market context
      marketContext: {
        overallMarket: data.marketOverview.marketSentiment?.level,
        sectorPerformance: this.getSectorContext(data),
        economicEnvironment: data.marketOverview.economicConditions?.overall,
        volatilityRegime: data.marketOverview.riskLevel,
      },

      // Execution guidance
      executionGuidance: this.generateExecutionGuidance(decision, data),
    };

    return recommendation;
  }

  private calculateStrength(decision: any, data: any) {
    let strength = decision.confidence;

    // Boost strength for aligned signals
    const technicalAlignment = this.checkTechnicalAlignment(data);
    const fundamentalAlignment = this.checkFundamentalAlignment(data);
    const sentimentAlignment = this.checkSentimentAlignment(data);

    if (technicalAlignment) strength += 0.1;
    if (fundamentalAlignment) strength += 0.1;
    if (sentimentAlignment) strength += 0.1;

    return Math.min(strength, 1.0);
  }

  private checkTechnicalAlignment(data: any) {
    const rsi = data.aggregatedAnalysis.technicalAnalysis?.rsi || 50;
    const trend = data.aggregatedAnalysis.technicalAnalysis?.trend;
    const momentum = data.aggregatedAnalysis.technicalAnalysis?.momentum;

    return (
      (rsi > 50 && trend === 'bullish' && momentum === 'positive') ||
      (rsi < 50 && trend === 'bearish' && momentum === 'negative')
    );
  }

  private checkFundamentalAlignment(data: any) {
    const pe = data.aggregatedAnalysis.fundamentalAnalysis?.pe || 20;
    const growth = data.aggregatedAnalysis.fundamentalAnalysis?.growth || 0;
    const roe = data.aggregatedAnalysis.fundamentalAnalysis?.roe || 0.15;

    return pe < 25 && growth > 5 && roe > 0.12;
  }

  private checkSentimentAlignment(data: any) {
    const sentiment = data.aggregatedAnalysis.sentimentAnalysis?.overall || 50;
    const newsScore = data.aggregatedAnalysis.newsAnalysis?.sentimentScore || 0.5;

    return (sentiment > 60 && newsScore > 0.6) || (sentiment < 40 && newsScore < 0.4);
  }

  private calculatePriceTargets(data: any, decision: any) {
    const currentPrice = data.marketData.price || 100;
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    const confidence = decision.confidence;

    const baseMove = volatility * confidence * 2;

    if (decision.action === 'BUY') {
      return {
        conservative: currentPrice * (1 + baseMove * 0.5),
        moderate: currentPrice * (1 + baseMove),
        aggressive: currentPrice * (1 + baseMove * 1.5),
        stopLoss: currentPrice * (1 - volatility * 0.5),
      };
    } else if (decision.action === 'SELL') {
      return {
        conservative: currentPrice * (1 - baseMove * 0.5),
        moderate: currentPrice * (1 - baseMove),
        aggressive: currentPrice * (1 - baseMove * 1.5),
        stopLoss: currentPrice * (1 + volatility * 0.5),
      };
    } else {
      return {
        conservative: currentPrice,
        moderate: currentPrice,
        aggressive: currentPrice,
        stopLoss: currentPrice * 0.95,
      };
    }
  }

  private calculateRiskManagement(data: any, decision: any) {
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    const beta = data.aggregatedAnalysis.riskAssessment?.beta || 1;
    const confidence = decision.confidence;

    return {
      stopLossPercent: Math.max(volatility * 0.5, 0.05),
      takeProfitPercent: volatility * confidence * 2,
      maxPositionSize: confidence * 0.1, // Max 10% of portfolio
      riskRewardRatio: 1 / (volatility * 2),
      correlationLimit: 0.7,
      timeStop: this.calculateTimeStop(confidence),
    };
  }

  private calculateTimeStop(confidence: number) {
    if (confidence > 0.8) return '2 weeks';
    if (confidence > 0.6) return '1 week';
    return '3 days';
  }

  private calculatePositionSizing(data: any, decision: any) {
    const confidence = decision.confidence;
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    const riskLevel = data.marketOverview.riskLevel;

    let baseSize = confidence * 0.05; // Base 5% max position

    // Adjust for volatility
    if (volatility > 0.3) baseSize *= 0.7;
    if (volatility < 0.15) baseSize *= 1.2;

    // Adjust for market risk
    if (riskLevel === 'HIGH') baseSize *= 0.6;
    if (riskLevel === 'LOW') baseSize *= 1.1;

    return {
      recommendedSize: Math.min(baseSize, 0.1), // Never exceed 10%
      minSize: baseSize * 0.5,
      maxSize: baseSize * 1.5,
      kellySize: this.calculateKellySize(data, decision),
    };
  }

  private calculateKellySize(data: any, decision: any) {
    const winRate = 0.6; // Assumed win rate
    const avgWin = 0.15; // Assumed average win
    const avgLoss = 0.08; // Assumed average loss

    const kellyPercent = (winRate * avgWin - (1 - winRate) * avgLoss) / avgWin;
    return Math.max(0, Math.min(kellyPercent * decision.confidence, 0.25));
  }

  private determineTimeframe(decision: any, data: any) {
    const confidence = decision.confidence;
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;

    if (confidence > 0.8 && volatility < 0.2) return 'LONG_TERM'; // 1-3 months
    if (confidence > 0.7) return 'MEDIUM_TERM'; // 2-6 weeks
    if (confidence > 0.6) return 'SHORT_TERM'; // 1-2 weeks
    return 'VERY_SHORT_TERM'; // 1-5 days
  }

  private determineUrgency(decision: any, data: any) {
    const confidence = decision.confidence;
    const newsImpact = data.aggregatedAnalysis.newsAnalysis?.impactScore || 0;
    const patternStrength = data.aggregatedAnalysis.patternAnalysis?.confidence || 0;

    if (confidence > 0.85 && (newsImpact > 0.8 || patternStrength > 0.8)) return 'IMMEDIATE';
    if (confidence > 0.75) return 'HIGH';
    if (confidence > 0.65) return 'MEDIUM';
    return 'LOW';
  }

  private identifySupportingFactors(data: any) {
    const factors = [];

    // Technical factors
    const rsi = data.aggregatedAnalysis.technicalAnalysis?.rsi;
    if (rsi < 30) factors.push('Oversold RSI conditions');
    if (rsi > 70) factors.push('Overbought RSI conditions');

    // Fundamental factors
    const pe = data.aggregatedAnalysis.fundamentalAnalysis?.pe;
    if (pe < 15) factors.push('Attractive valuation (low P/E)');
    if (pe > 30) factors.push('High valuation concerns');

    // Sentiment factors
    const sentiment = data.aggregatedAnalysis.sentimentAnalysis?.overall;
    if (sentiment > 70) factors.push('Strong bullish sentiment');
    if (sentiment < 30) factors.push('Extreme bearish sentiment (contrarian opportunity)');

    // Pattern factors
    const patterns = data.aggregatedAnalysis.patternAnalysis?.activePatterns || [];
    patterns.forEach(pattern => {
      if (pattern.confidence > 0.7) {
        factors.push(`Strong ${pattern.name} pattern detected`);
      }
    });

    // Volume factors
    const volume = data.marketData.volume || 1;
    const avgVolume = data.marketData.avgVolume || 1;
    if (volume > avgVolume * 1.5) {
      factors.push('High volume confirmation');
    }

    return factors;
  }

  private identifyRiskFactors(data: any) {
    const risks = [];

    // Volatility risks
    const volatility = data.aggregatedAnalysis.riskAssessment?.volatility || 0.2;
    if (volatility > 0.4) risks.push('High volatility environment');

    // Market risks
    const marketRisk = data.marketOverview.riskLevel;
    if (marketRisk === 'HIGH') risks.push('Elevated market risk conditions');

    // Correlation risks
    const correlation = data.aggregatedAnalysis.correlationAnalysis?.spyCorrelation || 0.5;
    if (correlation > 0.8) risks.push('High market correlation reduces diversification');

    // Economic risks
    const economicImpact = data.aggregatedAnalysis.economicImpact?.overallImpact || 0;
    if (economicImpact > 0.7) risks.push('Significant economic headwinds');

    // News risks
    const newsImpact = data.aggregatedAnalysis.newsAnalysis?.impactScore || 0;
    if (newsImpact > 0.8) risks.push('Major news events creating uncertainty');

    // Options risks
    const impliedVol = data.aggregatedAnalysis.optionsAnalysis?.impliedVolatility || 0.3;
    if (impliedVol > 0.5) risks.push('Elevated implied volatility suggests event risk');

    return risks;
  }

  private assessDataQuality(data: any) {
    let quality = 1.0;

    // Check data completeness
    if (!data.marketData.price) quality -= 0.2;
    if (!data.aggregatedAnalysis.sentimentAnalysis) quality -= 0.1;
    if (!data.aggregatedAnalysis.technicalAnalysis) quality -= 0.1;
    if (!data.aggregatedAnalysis.fundamentalAnalysis) quality -= 0.1;

    // Check data freshness
    const dataAge = Date.now() - new Date(data.timestamp).getTime();
    if (dataAge > 300000) quality -= 0.1; // 5 minutes old

    return Math.max(quality, 0.5);
  }

  private getSectorContext(data: any) {
    // Simulate sector performance context
    return {
      sector: 'Technology', // Would be determined from symbol
      performance: (Math.random() - 0.5) * 10,
      ranking: Math.floor(Math.random() * 11) + 1,
      momentum: Math.random() > 0.5 ? 'POSITIVE' : 'NEGATIVE',
    };
  }

  private generateExecutionGuidance(decision: any, data: any) {
    const guidance = [];

    if (decision.action === 'BUY') {
      guidance.push('Consider scaling into position over 2-3 transactions');
      guidance.push('Place stop loss immediately after entry');
      guidance.push('Monitor volume for confirmation');
    } else if (decision.action === 'SELL') {
      guidance.push('Consider scaling out of position');
      guidance.push('Use trailing stops to protect profits');
      guidance.push('Watch for reversal signals');
    } else {
      guidance.push('Wait for clearer signals before entering');
      guidance.push('Monitor key support/resistance levels');
      guidance.push('Watch for volume breakouts');
    }

    // Add market timing guidance
    const marketHours = this.isMarketHours();
    if (!marketHours) {
      guidance.push('Consider waiting for market open for better liquidity');
    }

    return guidance;
  }

  private isMarketHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    // Simple market hours check (9:30 AM - 4:00 PM ET, Mon-Fri)
    return day >= 1 && day <= 5 && hour >= 9 && hour < 16;
  }

  // Continuous Learning System
  private startContinuousLearning() {
    setInterval(() => {
      this.updateLearningSystem();
    }, 60000); // Update every minute
  }

  private updateLearningSystem() {
    // Simulate learning from recent decisions
    this.analyzeRecentPerformance();
    this.adjustNeuralWeights();
    this.updateDecisionThresholds();
  }

  private analyzeRecentPerformance() {
    // Analyze last 100 decisions
    const recentDecisions = this.learningHistory.slice(-100);

    if (recentDecisions.length > 10) {
      const accuracy = this.calculateAccuracy(recentDecisions);
      const profitability = this.calculateProfitability(recentDecisions);

      // Adjust confidence threshold based on performance
      if (accuracy < 0.6) {
        this.confidenceThreshold = Math.min(this.confidenceThreshold + 0.05, 0.9);
      } else if (accuracy > 0.8) {
        this.confidenceThreshold = Math.max(this.confidenceThreshold - 0.02, 0.6);
      }
    }
  }

  private calculateAccuracy(decisions: any[]) {
    const correct = decisions.filter(d => d.outcome === 'correct').length;
    return correct / decisions.length;
  }

  private calculateProfitability(decisions: any[]) {
    return decisions.reduce((sum, d) => sum + (d.profit || 0), 0) / decisions.length;
  }

  private adjustNeuralWeights() {
    // Simulate neural network weight adjustment
    const network = this.neuralNetwork.get('trading_network');

    // Small random adjustments to simulate learning
    Object.keys(network).forEach(layer => {
      if (network[layer].weights) {
        network[layer].weights = network[layer].weights.map(
          weight => weight + (Math.random() - 0.5) * 0.01
        );
      }
    });
  }

  private updateDecisionThresholds() {
    // Update decision tree thresholds based on performance
    const marketConditions = this.decisionTree.get('market_conditions');

    // Simulate threshold adjustments
    Object.keys(marketConditions).forEach(condition => {
      const rules = marketConditions[condition];
      if (rules.sentiment_threshold) {
        rules.sentiment_threshold += (Math.random() - 0.5) * 0.02;
        rules.sentiment_threshold = Math.max(0.1, Math.min(0.9, rules.sentiment_threshold));
      }
    });
  }

  private learnFromDecision(data: any, recommendation: any) {
    // Store decision for learning
    this.learningHistory.push({
      timestamp: new Date(),
      symbol: data.symbol,
      decision: recommendation.action,
      confidence: recommendation.confidence,
      marketData: data.marketData,
      // Outcome will be updated later when we know the result
      outcome: null,
      profit: null,
    });

    // Keep only last 1000 decisions
    if (this.learningHistory.length > 1000) {
      this.learningHistory.splice(0, this.learningHistory.length - 1000);
    }
  }

  private generateFallbackRecommendation(symbol: string) {
    return {
      symbol,
      timestamp: new Date(),
      action: 'HOLD',
      confidence: 0.5,
      strength: 0.5,
      reasoning: ['Insufficient data for reliable analysis'],
      priceTargets: { conservative: 0, moderate: 0, aggressive: 0, stopLoss: 0 },
      riskManagement: { stopLossPercent: 0.08, takeProfitPercent: 0.15 },
      positionSizing: { recommendedSize: 0.02 },
      timeframe: 'SHORT_TERM',
      urgency: 'LOW',
      supportingFactors: [],
      riskFactors: ['Data quality issues'],
      aiInsights: { modelConfidence: 0.5, dataQuality: 0.3 },
      marketContext: { overallMarket: 'NEUTRAL' },
      executionGuidance: ['Wait for better data before trading'],
    };
  }

  // Public API Methods
  async getIntelligentRecommendation(symbol: string) {
    return await this.analyzeAndDecide(symbol);
  }

  async getMarketIntelligence() {
    const marketOverview = await dataAggregationService.getMarketOverview();
    const topSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];

    const recommendations = await Promise.all(
      topSymbols.map(symbol => this.analyzeAndDecide(symbol))
    );

    return {
      marketOverview,
      topRecommendations: recommendations,
      marketSentiment: this.calculateOverallSentiment(recommendations),
      riskLevel: this.calculateOverallRisk(recommendations),
      opportunities: this.identifyTopOpportunities(recommendations),
      timestamp: new Date(),
    };
  }

  private calculateOverallSentiment(recommendations: any[]) {
    const buyCount = recommendations.filter(r => r.action === 'BUY').length;
    const sellCount = recommendations.filter(r => r.action === 'SELL').length;
    const avgConfidence =
      recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length;

    return {
      direction: buyCount > sellCount ? 'BULLISH' : sellCount > buyCount ? 'BEARISH' : 'NEUTRAL',
      strength: avgConfidence,
      buySignals: buyCount,
      sellSignals: sellCount,
      holdSignals: recommendations.length - buyCount - sellCount,
    };
  }

  private calculateOverallRisk(recommendations: any[]) {
    const avgRisk =
      recommendations.reduce((sum, r) => {
        const riskScore = r.riskFactors.length / 10; // Normalize risk factors
        return sum + riskScore;
      }, 0) / recommendations.length;

    if (avgRisk > 0.7) return 'HIGH';
    if (avgRisk > 0.4) return 'MEDIUM';
    return 'LOW';
  }

  private identifyTopOpportunities(recommendations: any[]) {
    return recommendations
      .filter(r => r.action === 'BUY' && r.confidence > 0.7)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3)
      .map(r => ({
        symbol: r.symbol,
        confidence: r.confidence,
        reasoning: r.reasoning.slice(0, 2),
        timeframe: r.timeframe,
        priceTarget: r.priceTargets.moderate,
      }));
  }
}
