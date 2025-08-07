import axios from 'axios';
import type { UserProfile, WorkoutPlan, MealPlan } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateWorkoutPlan = async (profile: UserProfile): Promise<WorkoutPlan> => {
  try {
    const response = await api.post('/generate-workout', profile);
    return response.data;
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan');
  }
};

export const generateMealPlan = async (profile: UserProfile): Promise<MealPlan> => {
  try {
    const response = await api.post('/generate-meal-plan', profile);
    return response.data;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
};

export const customizeWorkoutPlan = async (
  planId: string, 
  customizations: Partial<UserProfile>
): Promise<WorkoutPlan> => {
  try {
    const response = await api.post(`/customize-workout/${planId}`, customizations);
    return response.data;
  } catch (error) {
    console.error('Error customizing workout plan:', error);
    throw new Error('Failed to customize workout plan');
  }
};

export const customizeMealPlan = async (
  planId: string, 
  customizations: Partial<UserProfile>
): Promise<MealPlan> => {
  try {
    const response = await api.post(`/customize-meal-plan/${planId}`, customizations);
    return response.data;
  } catch (error) {
    console.error('Error customizing meal plan:', error);
    throw new Error('Failed to customize meal plan');
  }
};