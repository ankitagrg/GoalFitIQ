import openai from '../config/openai.js';

export const generateWorkoutPlan = async (profile) => {
  const prompt = `Generate a personalized workout plan for the user with the following profile:

Fitness Level: ${profile.fitnessLevel}
Goal: ${profile.fitnessGoal.replace('-', ' ')}
Available Equipment: ${profile.equipment.join(', ') || 'Bodyweight only'}
Workout Duration: ${profile.workoutDuration} minutes

The plan should consist of a 5-day workout routine with exercises targeting different muscle groups, suitable for ${profile.fitnessLevel}-level fitness. Include sets, reps, rest times, and a brief description of each exercise. Provide modifications for easier or more difficult variations.

Return the response in the following JSON format:
{
  "title": "5-Day [Goal] Workout Plan",
  "duration": "${profile.workoutDuration} minutes",
  "level": "${profile.fitnessLevel}",
  "days": [
    {
      "day": "Day 1",
      "focus": "Upper Body",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "8-12",
          "restTime": "60-90 seconds",
          "description": "Brief exercise description",
          "modifications": "Optional easier/harder variations"
        }
      ]
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a certified personal trainer and fitness expert. Generate detailed, safe, and effective workout plans based on user preferences. Always return valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan');
  }
};

export const generateMealPlan = async (profile) => {
  const calorieTargets = {
    'weight-loss': 1600,
    'muscle-gain': 2200,
    'endurance': 2000,
    'strength': 2100
  };

  const targetCalories = calorieTargets[profile.fitnessGoal] || 1800;

  const prompt = `Generate a 7-day meal plan for the user with the following profile:

Goal: ${profile.fitnessGoal.replace('-', ' ')}
Diet Preference: ${profile.dietPreference}
Target Calorie Intake: ${targetCalories} kcal per day

The meal plan should contain 3 main meals (Breakfast, Lunch, Dinner) and 2 snacks for each day. Focus on meals that support the user's fitness goal while following their diet preference. Provide nutritional information and include a shopping list.

Return the response in the following JSON format:
{
  "title": "7-Day ${profile.dietPreference} Meal Plan",
  "dietType": "${profile.dietPreference}",
  "dailyCalories": ${targetCalories},
  "days": [
    {
      "day": "Day 1",
      "breakfast": {
        "name": "Meal name",
        "calories": 400,
        "protein": 25,
        "carbs": 45,
        "fat": 12,
        "recipe": "Brief preparation instructions"
      },
      "lunch": {
        "name": "Meal name",
        "calories": 500,
        "protein": 30,
        "carbs": 55,
        "fat": 18,
        "recipe": "Brief preparation instructions"
      },
      "dinner": {
        "name": "Meal name",
        "calories": 600,
        "protein": 35,
        "carbs": 60,
        "fat": 20,
        "recipe": "Brief preparation instructions"
      },
      "snack1": {
        "name": "Snack name",
        "calories": 200,
        "protein": 10,
        "carbs": 25,
        "fat": 8,
        "recipe": "Brief preparation instructions"
      },
      "snack2": {
        "name": "Snack name",
        "calories": 150,
        "protein": 8,
        "carbs": 20,
        "fat": 6,
        "recipe": "Brief preparation instructions"
      },
      "totalCalories": 1850
    }
  ],
  "shoppingList": ["ingredient1", "ingredient2", "ingredient3"]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a certified nutritionist and meal planning expert. Generate balanced, nutritious meal plans based on user preferences and fitness goals. Always return valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = completion.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
};
