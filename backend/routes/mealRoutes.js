import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateMealPlan as generateAIMealPlan } from '../services/aiService.js';

const router = express.Router();

// Log the routes being registered for debugging purposes
console.log('Registering meal routes');

// Generate meal plan
router.post('/generate-meal-plan', async (req, res) => {
  try {
    const profile = req.body;
    
    // Validate required fields
    if (!profile.fitnessGoal || !profile.dietPreference) {
      return res.status(400).json({ 
        error: 'Missing required fields: fitnessGoal, dietPreference' 
      });
    }

    const mealPlan = await generateAIMealPlan(profile);
    
    // Add metadata
    const enrichedPlan = {
      id: uuidv4(),
      ...mealPlan,
      createdAt: new Date().toISOString()
    };

    res.json(enrichedPlan);
  } catch (error) {
    console.error('Error in generate-meal-plan:', error);
    res.status(500).json({ 
      error: 'Failed to generate meal plan',
      message: error.message 
    });
  }
});

// Customize meal plan
router.post('/customize-meal-plan/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const customizations = req.body;

    const mealPlan = await generateAIMealPlan(customizations);
    
    const enrichedPlan = {
      id: planId, // Keep the same ID for customization
      ...mealPlan,
      createdAt: new Date().toISOString()
    };

    res.json(enrichedPlan);
  } catch (error) {
    console.error('Error in customize-meal-plan:', error);
    res.status(500).json({ 
      error: 'Failed to customize meal plan',
      message: error.message 
    });
  }
});

export default router;
