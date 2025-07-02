'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/50 border-red-500/20 backdrop-blur-xl">
        <div className="text-center p-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-gray-300">
            Our AI encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
          </CardDescription>
        </div>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Error ID: {error.digest || 'Unknown'}
          </div>
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <div className="text-center text-xs text-gray-500 mt-6">
            AlphaAIStockX - Powered by Quantum AI
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
