import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Flame } from 'lucide-react';
import type { MealPlan } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MealPlanCardProps {
  plan: MealPlan;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const getMealTypeColor = (mealType: string) => {
    const colors = {
      breakfast: 'text-yellow-600 bg-yellow-50',
      lunch: 'text-orange-600 bg-orange-50',
      dinner: 'text-purple-600 bg-purple-50',
      snack1: 'text-green-600 bg-green-50',
      snack2: 'text-blue-600 bg-blue-50'
    };
    return colors[mealType as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const getMealDisplayName = (mealType: string) => {
    const names = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack1: 'Morning Snack',
      snack2: 'Evening Snack'
    };
    return names[mealType as keyof typeof names] || mealType;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {plan.days.length} Days
          </span>
          <span className="flex items-center">
            <Flame className="h-4 w-4 mr-1" />
            {plan.dailyCalories} cal/day
          </span>
          <span className="capitalize">{plan.dietType}</span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {plan.days.map((day, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleDay(index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{day.day}</h4>
                <p className="text-sm text-gray-600">{day.totalCalories} calories total</p>
              </div>
              {expandedDay === index ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedDay === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <div className="space-y-3">
                    {Object.entries(day).filter(([key]) => key !== 'day' && key !== 'totalCalories').map(([mealType, meal]) => {
                      if (typeof meal === 'object' && meal !== null && 'name' in meal) {
                        return (
                          <div key={mealType} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getMealTypeColor(mealType)}`}>
                                  {getMealDisplayName(mealType)}
                                </span>
                                <h5 className="font-medium text-gray-900">{meal.name}</h5>
                              </div>
                              <div className="text-sm text-gray-600 text-right">
                                <div className="font-medium">{meal.calories} cal</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="bg-white p-2 rounded text-center">
                                <div className="font-medium text-blue-600">{meal.protein}g</div>
                                <div>Protein</div>
                              </div>
                              <div className="bg-white p-2 rounded text-center">
                                <div className="font-medium text-green-600">{meal.carbs}g</div>
                                <div>Carbs</div>
                              </div>
                              <div className="bg-white p-2 rounded text-center">
                                <div className="font-medium text-yellow-600">{meal.fat}g</div>
                                <div>Fat</div>
                              </div>
                            </div>
                            {meal.recipe && (
                              <div className="mt-3 text-xs text-gray-600 bg-white p-2 rounded">
                                <strong>Recipe:</strong> {meal.recipe}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {plan.shoppingList && plan.shoppingList.length > 0 && (
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">Shopping List</h4>
          <div className="text-sm text-gray-600 space-y-1">
            {plan.shoppingList.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                {item}
              </div>
            ))}
            {plan.shoppingList.length > 5 && (
              <div className="text-xs text-gray-500 mt-2">
                +{plan.shoppingList.length - 5} more items...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanCard;