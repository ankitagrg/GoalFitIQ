import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { UserProfile } from '../types';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [profile, setProfile] = useState<UserProfile>({
    fitnessLevel: 'beginner',
    fitnessGoal: 'weight-loss',
    equipment: [],
    dietPreference: 'non-vegetarian',
    workoutDuration: '45',
  });

  const equipmentOptions = [
    'Bodyweight', 'Dumbbells', 'Resistance Bands', 'Kettlebells', 
    'Barbell', 'Pull-up Bar', 'Yoga Mat', 'Treadmill'
  ];

  const handleEquipmentToggle = (equipment: string) => {
    setProfile(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      navigate('/plans');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">What's your fitness level?</h2>
            <div className="grid gap-4">
              {[
                { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a long break' },
                { value: 'intermediate', label: 'Intermediate', description: 'Regular exercise routine for 6+ months' },
                { value: 'advanced', label: 'Advanced', description: 'Consistent training for 2+ years' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile(prev => ({ ...prev, fitnessLevel: option.value as any }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    profile.fitnessLevel === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">What's your primary goal?</h2>
            <div className="grid gap-4">
              {[
                { value: 'weight-loss', label: 'Weight Loss', description: 'Burn fat and lose weight' },
                { value: 'muscle-gain', label: 'Muscle Gain', description: 'Build muscle mass and strength' },
                { value: 'endurance', label: 'Endurance', description: 'Improve cardiovascular fitness' },
                { value: 'strength', label: 'Strength', description: 'Increase overall strength and power' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile(prev => ({ ...prev, fitnessGoal: option.value as any }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    profile.fitnessGoal === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">What equipment do you have?</h2>
            <p className="text-gray-600 text-center">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3">
              {equipmentOptions.map((equipment) => (
                <button
                  key={equipment}
                  onClick={() => handleEquipmentToggle(equipment)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    profile.equipment.includes(equipment)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {equipment}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">What's your diet preference?</h2>
            <div className="grid gap-4">
              {[
                { value: 'non-vegetarian', label: 'Non-Vegetarian', description: 'Includes meat, fish, and poultry' },
                { value: 'vegetarian', label: 'Vegetarian', description: 'No meat, but includes dairy and eggs' },
                { value: 'vegan', label: 'Vegan', description: 'Plant-based diet only' },
                { value: 'keto', label: 'Keto', description: 'Low-carb, high-fat diet' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile(prev => ({ ...prev, dietPreference: option.value as any }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    profile.dietPreference === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">How long can you workout?</h2>
            <div className="grid gap-4">
              {[
                { value: '30', label: '30 minutes', description: 'Quick and efficient workouts' },
                { value: '45', label: '45 minutes', description: 'Balanced workout duration' },
                { value: '60', label: '1 hour', description: 'Comprehensive training sessions' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile(prev => ({ ...prev, workoutDuration: option.value as any }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    profile.workoutDuration === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              {currentStep === totalSteps ? 'Generate Plans' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileForm;