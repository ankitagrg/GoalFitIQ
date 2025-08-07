import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, Settings, Clock, Target, Utensils, Dumbbell } from 'lucide-react';
import type { UserProfile, WorkoutPlan, MealPlan } from '../types';
import { generateWorkoutPlan, generateMealPlan } from '../utils/api';
import WorkoutPlanCard from './WorkoutPlanCard';
import MealPlanCard from './MealPlanCard';

const PlansPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      generatePlans(parsedProfile);
    }
  }, []);

  const generatePlans = async (userProfile: UserProfile) => {
    setLoading(true);
    setError(null);
    
    try {
      const [workout, meal] = await Promise.all([
        generateWorkoutPlan(userProfile),
        generateMealPlan(userProfile)
      ]);
      
      setWorkoutPlan(workout);
      setMealPlan(meal);
    } catch (err) {
      setError('Failed to generate plans. Please try again.');
      console.error('Error generating plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (profile) {
      generatePlans(profile);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile found. Please complete the profile form first.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Plans</h2>
            <p className="text-gray-600">Our AI is creating personalized workout and meal plans just for you...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRegenerate}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Plans</h1>
            <p className="text-xl text-gray-600 mb-6">AI-generated plans tailored to your goals and preferences</p>
            
            {/* Profile Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Target className="h-6 w-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {profile.fitnessGoal.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Settings className="h-6 w-6 text-pink-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {profile.fitnessLevel}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-6 w-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {profile.workoutDuration} min
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Utensils className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {profile.dietPreference.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegenerate}
              className="mt-6 inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Plans
            </button>
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Workout Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Dumbbell className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Workout Plan</h2>
              </div>
              {workoutPlan && <WorkoutPlanCard plan={workoutPlan} />}
            </motion.div>

            {/* Meal Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Utensils className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Meal Plan</h2>
              </div>
              {mealPlan && <MealPlanCard plan={mealPlan} />}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlansPage;