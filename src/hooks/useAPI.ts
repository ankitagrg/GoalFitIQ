import { useState, useCallback } from 'react';
import { APIClient } from '../utils/api.js'; 

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateWorkoutPlan = useCallback((profile: any) => {
    return execute(() => APIClient.generateWorkoutPlan(profile));
  }, [execute]);

  const generateMealPlan = useCallback((profile: any) => {
    return execute(() => APIClient.generateMealPlan(profile));
  }, [execute]);

  const regeneratePlan = useCallback((type: 'workout' | 'meal', profile: any, customizations?: any) => {
    return execute(() => APIClient.regeneratePlan(type, profile, customizations));
  }, [execute]);

  return {
    loading,
    error,
    generateWorkoutPlan,
    generateMealPlan,
    regeneratePlan,
    clearError: () => setError(null),
  };
}