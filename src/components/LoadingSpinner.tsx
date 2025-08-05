import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Generating your personalized plans...' }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          AI is Working Its Magic ✨
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {message}
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="animate-pulse">🧠 Analyzing your fitness profile...</div>
          <div className="animate-pulse delay-75">💪 Creating personalized workouts...</div>
          <div className="animate-pulse delay-150">🥗 Designing your meal plan...</div>
        </div>
      </div>
    </div>
  );
}