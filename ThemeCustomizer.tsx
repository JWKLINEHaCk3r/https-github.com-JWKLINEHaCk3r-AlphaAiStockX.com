'use client';

import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Palette, Zap, Settings, Eye, Sparkles } from 'lucide-react';
import { useNeonTheme } from './NeonThemeProvider';

export default function ThemeCustomizer() {
  const {
    theme,
    setTheme,
    glowIntensity,
    setGlowIntensity,
    animationSpeed,
    setAnimationSpeed,
    themes,
  } = useNeonTheme();

  return (
    <Card className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-purple-400/50 backdrop-blur-xl shadow-2xl shadow-purple-500/25">
      <CardHeader>
        <CardTitle className="text-white flex items-center text-2xl">
          <Palette className="h-8 w-8 mr-3 text-purple-400 animate-pulse" />
          🎨 NEON THEME CUSTOMIZER
          <Badge className="ml-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white animate-pulse">
            <Sparkles className="h-3 w-3 mr-1" />
            PREMIUM
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-cyan-400" />
            Choose Your Neon Style
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(themes).map(([key, themeData]) => (
              <Button
                key={key}
                onClick={() => setTheme(key)}
                className={`p-6 h-auto flex flex-col items-center space-y-3 transition-all duration-300 ${
                  theme === key
                    ? `bg-gradient-to-r ${themeData.primary} text-black shadow-2xl scale-105`
                    : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:scale-105'
                }`}
              >
                <div
                  className={`w-full h-4 bg-gradient-to-r ${themeData.primary} rounded-full`}
                ></div>
                <div className="flex space-x-2">
                  <div
                    className={`w-3 h-3 bg-gradient-to-r ${themeData.secondary} rounded-full`}
                  ></div>
                  <div
                    className={`w-3 h-3 bg-gradient-to-r ${themeData.accent} rounded-full`}
                  ></div>
                  <div
                    className={`w-3 h-3 bg-gradient-to-r ${themeData.warning} rounded-full`}
                  ></div>
                  <div
                    className={`w-3 h-3 bg-gradient-to-r ${themeData.danger} rounded-full`}
                  ></div>
                </div>
                <span className="font-bold">{themeData.name}</span>
                {theme === key && (
                  <Badge className="bg-white text-black">
                    <Zap className="h-3 w-3 mr-1" />
                    ACTIVE
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Glow Intensity */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            Glow Intensity: {glowIntensity}%
          </h3>
          <div className="space-y-4">
            <Slider
              value={[glowIntensity]}
              onValueChange={value => setGlowIntensity(value[0])}
              max={200}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGlowIntensity(0)}
                className="border-gray-500 text-gray-300"
              >
                No Glow
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGlowIntensity(100)}
                className="border-cyan-500 text-cyan-400"
              >
                Normal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGlowIntensity(200)}
                className="border-purple-500 text-purple-400"
              >
                Extreme
              </Button>
            </div>
          </div>
        </div>

        {/* Animation Speed */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-green-400" />
            Animation Speed: {animationSpeed}%
          </h3>
          <div className="space-y-4">
            <Slider
              value={[animationSpeed]}
              onValueChange={value => setAnimationSpeed(value[0])}
              max={300}
              min={25}
              step={25}
              className="w-full"
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationSpeed(25)}
                className="border-gray-500 text-gray-300"
              >
                Slow
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationSpeed(100)}
                className="border-green-500 text-green-400"
              >
                Normal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimationSpeed(300)}
                className="border-red-500 text-red-400"
              >
                Hyper
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">🔥 Live Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 bg-gradient-to-r ${themes[theme].primary}/20 rounded-xl border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/50 animate-pulse`}
            >
              <div
                className={`w-8 h-8 bg-gradient-to-r ${themes[theme].primary} rounded-full mx-auto mb-2`}
              ></div>
              <p className="text-center text-white font-bold">Primary</p>
            </div>
            <div
              className={`p-4 bg-gradient-to-r ${themes[theme].secondary}/20 rounded-xl border-2 border-purple-400/30 shadow-lg shadow-purple-500/50 animate-pulse`}
            >
              <div
                className={`w-8 h-8 bg-gradient-to-r ${themes[theme].secondary} rounded-full mx-auto mb-2`}
              ></div>
              <p className="text-center text-white font-bold">Secondary</p>
            </div>
            <div
              className={`p-4 bg-gradient-to-r ${themes[theme].accent}/20 rounded-xl border-2 border-green-400/30 shadow-lg shadow-green-500/50 animate-pulse`}
            >
              <div
                className={`w-8 h-8 bg-gradient-to-r ${themes[theme].accent} rounded-full mx-auto mb-2`}
              ></div>
              <p className="text-center text-white font-bold">Accent</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
