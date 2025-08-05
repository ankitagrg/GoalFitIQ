import { useState } from 'react';
import { Clock, Users, RefreshCw, Download, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import type { 
    MealPlan } from '../types/index';
interface MealPlanProps {
  plan: MealPlan;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function MealPlan({ plan, onRegenerate, isRegenerating }: MealPlanProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const toggleDayExpansion = (dayIndex: number) => {
    setExpandedDays(prev =>
      prev.includes(dayIndex)
        ? prev.filter(i => i !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const exportPlan = () => {
    const content = `
MEAL PLAN: ${plan.name}

${plan.description}

${plan.days.map(day => `
DAY: ${day.day}
Total Calories: ${day.totalNutrition.calories}
Protein: ${day.totalNutrition.protein}g | Carbs: ${day.totalNutrition.carbs}g | Fat: ${day.totalNutrition.fat}g

BREAKFAST: ${day.breakfast.name}
Prep: ${day.breakfast.prepTime}min | Cook: ${day.breakfast.cookTime}min | Serves: ${day.breakfast.servings}
Calories: ${day.breakfast.nutrition.calories} | P: ${day.breakfast.nutrition.protein}g | C: ${day.breakfast.nutrition.carbs}g | F: ${day.breakfast.nutrition.fat}g

Ingredients:
${day.breakfast.ingredients.map(ing => `• ${ing}`).join('\n')}

Instructions:
${day.breakfast.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

LUNCH: ${day.lunch.name}
[Similar format for lunch...]

DINNER: ${day.dinner.name}
[Similar format for dinner...]

SNACKS:
${day.snacks.map(snack => `• ${snack.name} (${snack.nutrition.calories} cal)`).join('\n')}
`).join('\n')}

SHOPPING LIST:
${plan.shoppingList.map(item => `• ${item}`).join('\n')}

TIPS:
${plan.tips.map(tip => `• ${tip}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.name.replace(/\s+/g, '_')}_meal_plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMeal = (meal: any) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <h5 className="font-semibold text-gray-900">{meal.name}</h5>
        <div className="text-right text-sm text-gray-600">
          <div>{meal.nutrition.calories} cal</div>
          <div className="flex space-x-2 text-xs">
            <span>P: {meal.nutrition.protein}g</span>
            <span>C: {meal.nutrition.carbs}g</span>
            <span>F: {meal.nutrition.fat}g</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-3 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Prep: {meal.prepTime}min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Cook: {meal.cookTime}min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>Serves: {meal.servings}</span>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="font-medium text-gray-700 mb-1">Ingredients:</h6>
        <ul className="text-sm text-gray-600 space-y-1">
          {meal.ingredients.map((ingredient: string, i: number) => (
            <li key={i}>• {ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h6 className="font-medium text-gray-700 mb-1">Instructions:</h6>
        <ol className="text-sm text-gray-600 space-y-1">
          {meal.instructions.map((instruction: string, i: number) => (
            <li key={i}>{i + 1}. {instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="opacity-90 mb-4">{plan.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowShoppingList(!showShoppingList)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportPlan}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Shopping List Modal */}
      {showShoppingList && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-yellow-900">Shopping List</h3>
            <button
              onClick={() => setShowShoppingList(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {plan.shoppingList.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-yellow-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meal Days */}
      <div className="p-6">
        <div className="space-y-4">
          {plan.days.map((day, dayIndex) => (
            <div key={dayIndex} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDayExpansion(dayIndex)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-gray-900">{day.day}</h3>
                  <p className="text-gray-600">
                    {day.totalNutrition.calories} calories • 
                    P: {day.totalNutrition.protein}g • 
                    C: {day.totalNutrition.carbs}g • 
                    F: {day.totalNutrition.fat}g
                  </p>
                </div>
                {expandedDays.includes(dayIndex) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedDays.includes(dayIndex) && (
                <div className="p-6 bg-white space-y-6">
                  {/* Breakfast */}
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3">🍳 Breakfast</h4>
                    {renderMeal(day.breakfast)}
                  </div>

                  {/* Lunch */}
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3">🥗 Lunch</h4>
                    {renderMeal(day.lunch)}
                  </div>

                  {/* Dinner */}
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-3">🍽️ Dinner</h4>
                    {renderMeal(day.dinner)}
                  </div>

                  {/* Snacks */}
                  {day.snacks.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">🍎 Snacks</h4>
                      <div className="grid gap-3">
                        {day.snacks.map((snack, i) => (
                          <div key={i} className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{snack.name}</span>
                              <span className="text-sm text-gray-600">{snack.nutrition.calories} cal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        {plan.tips.length > 0 && (
          <div className="mt-8 bg-green-50 p-6 rounded-xl">
            <h4 className="font-semibold text-green-900 mb-3">🍃 Nutrition Tips</h4>
            <ul className="space-y-2">
              {plan.tips.map((tip, i) => (
                <li key={i} className="text-green-800 text-sm">• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}