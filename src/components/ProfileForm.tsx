import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Target, Dumbbell, Utensils } from 'lucide-react';
import type { UserProfile } from '../types/index';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

export function ProfileForm({ onSubmit, onBack }: ProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    fitnessLevel: 'beginner',
    fitnessGoal: 'weight_loss',
    availableEquipment: [],
    dietPreference: 'non_vegetarian',
    workoutDuration: 45,
    calorieGoal: 2000,
    restrictions: []
  });

  const steps = [
    {
      title: 'Fitness Level',
      icon: <User className="w-6 h-6" />,
      description: 'Tell us about your current fitness experience'
    },
    {
      title: 'Goals',
      icon: <Target className="w-6 h-6" />,
      description: 'What do you want to achieve?'
    },
    {
      title: 'Equipment',
      icon: <Dumbbell className="w-6 h-6" />,
      description: 'What equipment do you have access to?'
    },
    {
      title: 'Diet & Duration',
      icon: <Utensils className="w-6 h-6" />,
      description: 'Your dietary preferences and workout time'
    }
  ];

  const equipmentOptions = [
    'Bodyweight',
    'Dumbbells',
    'Barbell',
    'Resistance Bands',
    'Kettlebells',
    'Pull-up Bar',
    'Gym Access',
    'Yoga Mat',
    'Stability Ball',
    'TRX Straps'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const toggleEquipment = (equipment: string) => {
    setProfile(prev => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(equipment)
        ? prev.availableEquipment.filter(e => e !== equipment)
        : [...prev.availableEquipment, equipment]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's your fitness level?</h3>
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setProfile(prev => ({ ...prev, fitnessLevel: level as any }))}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  profile.fitnessLevel === level
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold text-lg capitalize">{level}</div>
                <div className="text-sm mt-1 opacity-80">
                  {level === 'beginner' && 'New to exercise or getting back into it'}
                  {level === 'intermediate' && 'Regular exercise routine for 6+ months'}
                  {level === 'advanced' && 'Consistent training for 2+ years'}
                </div>
              </button>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's your primary goal?</h3>
            {[
              { value: 'weight_loss', label: 'Weight Loss', desc: 'Burn fat and lose weight' },
              { value: 'muscle_gain', label: 'Muscle Gain', desc: 'Build muscle and strength' },
              { value: 'endurance', label: 'Endurance', desc: 'Improve cardiovascular fitness' },
              { value: 'strength', label: 'Strength', desc: 'Increase overall strength' }
            ].map((goal) => (
              <button
                key={goal.value}
                onClick={() => setProfile(prev => ({ ...prev, fitnessGoal: goal.value as any }))}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  profile.fitnessGoal === goal.value
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold text-lg">{goal.label}</div>
                <div className="text-sm mt-1 opacity-80">{goal.desc}</div>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What equipment do you have?</h3>
            <p className="text-gray-600 mb-6">Select all that apply (you can choose multiple)</p>
            <div className="grid grid-cols-2 gap-3">
              {equipmentOptions.map((equipment) => (
                <button
                  key={equipment}
                  onClick={() => toggleEquipment(equipment)}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    profile.availableEquipment.includes(equipment)
                      ? 'border-purple-500 bg-purple-50 text-purple-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{equipment}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Final preferences</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Diet Preference
                </label>
                <select
                  value={profile.dietPreference}
                  onChange={(e) => setProfile(prev => ({ ...prev, dietPreference: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Workout Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[30, 45, 60].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setProfile(prev => ({ ...prev, workoutDuration: duration as any }))}
                      className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                        profile.workoutDuration === duration
                          ? 'border-orange-500 bg-orange-50 text-orange-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Daily Calorie Goal (optional)
                </label>
                <input
                  type="number"
                  value={profile.calorieGoal || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, calorieGoal: parseInt(e.target.value) || undefined }))}
                  placeholder="2000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs opacity-75">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span>{currentStep === steps.length - 1 ? 'Generate Plans' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}