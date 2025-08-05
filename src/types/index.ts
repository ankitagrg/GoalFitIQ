export interface UserProfile {
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    fitnessGoal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'strength';
    availableEquipment: string[];
    dietPreference: 'vegetarian' | 'non_vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean';
    workoutDuration: 30 | 45 | 60;
    calorieGoal?: number;
    restrictions?: string[];
  }
  
  export interface Exercise {
    name: string;
    sets: number;
    reps: string;
    restTime: string;
    description: string;
    targetMuscles: string[];
    difficulty: string;
    modifications?: {
      easier?: string;
      harder?: string;
    };
  }
  
  export interface WorkoutDay {
    day: string;
    focus: string;
    exercises: Exercise[];
    totalDuration: number;
    warmup: string[];
    cooldown: string[];
  }
  
  export interface WorkoutPlan {
    id: string;
    name: string;
    description: string;
    duration: string;
    difficulty: string;
    days: WorkoutDay[];
    tips: string[];
    createdAt: Date;
  }
  
  export interface Meal {
    name: string;
    ingredients: string[];
    instructions: string[];
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    prepTime: number;
    cookTime: number;
    servings: number;
  }
  
  export interface DayMeals {
    day: string;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
    totalNutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
  }
  
  export interface MealPlan {
    id: string;
    name: string;
    description: string;
    days: DayMeals[];
    shoppingList: string[];
    tips: string[];
    createdAt: Date;
  }
  
  export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }