import { useState } from 'react';
import { HomePage } from '../src/components/HomePage';
import { ProfileForm } from '../src/components/ProfileForm';
import { WorkoutPlan } from '../src/components/WorkoutPlan';
import { MealPlan } from '../src/components/MealPlan';
import { LoadingSpinner } from '../src/components/LoadingSpinner';
import { useAPI } from '../src/hooks/useAPI';
import type { UserProfile, WorkoutPlan as WorkoutPlanType, MealPlan as MealPlanType } from '../src/types';

type AppState = 'home' | 'profile' | 'loading' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading, generateWorkoutPlan, generateMealPlan, regeneratePlan } = useAPI();

  const handleGetStarted = () => {
    setCurrentState('profile');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setUserProfile(null);
    setWorkoutPlan(null);
    setMealPlan(null);
    setError(null);
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentState('loading');
    setError(null);

    try {
      // Generate both plans concurrently
      const [workoutResult, mealResult] = await Promise.all([
        generateWorkoutPlan(profile),
        generateMealPlan(profile)
      ]);

      if (workoutResult && mealResult && Object.keys(workoutResult).length > 0 && Object.keys(mealResult).length > 0) {
        setWorkoutPlan(workoutResult as WorkoutPlanType);
        setMealPlan(mealResult as MealPlanType);
        setCurrentState('results');
      } else {
        throw new Error('Failed to generate plans');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate plans');
      setCurrentState('profile');
    }
  };

  const handleRegenerateWorkout = async () => {
    if (!userProfile) return;
    
    try {
      const result = await regeneratePlan('workout', userProfile);
      if (result && Object.keys(result).length > 0) {
        setWorkoutPlan(result as WorkoutPlanType);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate workout plan');
    }
  };

  const handleRegenerateMeal = async () => {
    if (!userProfile) return;
    
    try {
      const result = await regeneratePlan('meal', userProfile);
      if (result && Object.keys(result).length > 0) {
        setMealPlan(result as MealPlanType);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate meal plan');
    }
  };

  if (currentState === 'home') {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  if (currentState === 'profile') {
    return (
      <div>
        <ProfileForm onSubmit={handleProfileSubmit} onBack={handleBackToHome} />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            <div className="font-medium">Error</div>
            <div className="text-sm">{error}</div>
            <button
              onClick={() => setError(null)}
              className="absolute top-1 right-1 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  }

  if (currentState === 'loading') {
    return <LoadingSpinner />;
  }

  if (currentState === 'results' && workoutPlan && mealPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Your Personalized Plans</h1>
              <button
                onClick={handleBackToHome}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Create New Plans
              </button>
            </div>
          </div>
        </header>

        {/* Plans */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <WorkoutPlan
                plan={workoutPlan}
                onRegenerate={handleRegenerateWorkout}
                isRegenerating={loading}
              />
            </div>
            <div>
              <MealPlan
                plan={mealPlan}
                onRegenerate={handleRegenerateMeal}
                isRegenerating={loading}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <div>Something went wrong. Please try again.</div>;
}

export default App;