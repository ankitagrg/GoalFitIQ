const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

export class APIClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async generateWorkoutPlan(profile: any) {
    return this.request('/plans/workout', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  }

  static async generateMealPlan(profile: any) {
    return this.request('/plans/meal', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  }

  static async regeneratePlan(type: 'workout' | 'meal', profile: any, customizations?: any) {
    return this.request(`/plans/${type}/regenerate`, {
      method: 'POST',
      body: JSON.stringify({ profile, customizations }),
    });
  }
}