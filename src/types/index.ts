export interface UserProfile {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  fitnessGoal: 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength';
  equipment: string[];
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'keto';
  workoutDuration: '30' | '45' | '60';
  calorieIntake?: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  description: string;
  modifications?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  duration: string;
  level: string;
  days: WorkoutDay[];
  createdAt: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipe?: string;
}

export interface MealDay {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack1: Meal;
  snack2: Meal;
  totalCalories: number;
}

export interface MealPlan {
  id: string;
  title: string;
  dietType: string;
  dailyCalories: number;
  days: MealDay[];
  shoppingList?: string[];
  createdAt: string;
}