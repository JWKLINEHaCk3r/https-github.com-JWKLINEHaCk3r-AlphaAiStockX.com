import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Home, TrendingUp, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/50 border-purple-500/20 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">404 - Page Not Found</CardTitle>
          <CardDescription className="text-gray-300">
            The page you're looking for doesn't exist in our AI trading universe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Don't worry, even our quantum AI can't predict every path!
          </div>
          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
            >
              <Link href="/trading" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Start Trading
              </Link>
            </Button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-6">
            AlphaAIStockX - Your AI Trading Companion
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
