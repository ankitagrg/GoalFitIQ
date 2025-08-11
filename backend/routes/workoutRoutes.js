import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateWorkoutPlan as generateAIWorkoutPlan } from '../services/aiService.js';

const router = express.Router();

console.log('Registering workout routes');

router.post('/generate-workout', async (req, res) => {
  try {
    const profile = req.body;
    
    if (!profile.fitnessLevel || !profile.fitnessGoal || !profile.workoutDuration) {
      return res.status(400).json({ 
        error: 'Missing required fields: fitnessLevel, fitnessGoal, workoutDuration' 
      });
    }

    const workoutPlan = await generateAIWorkoutPlan(profile);
  
    const enrichedPlan = {
      id: uuidv4(),
      ...workoutPlan,
      createdAt: new Date().toISOString()
    };

    res.json(enrichedPlan);
  } catch (error) {
    console.error('Error in generate-workout:', error);
    res.status(500).json({ 
      error: 'Failed to generate workout plan',
      message: error.message 
    });
  }
});

// Customize workout plan
router.post('/customize-workout/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const customizations = req.body;

    // For now, we'll generate a new plan with the customizations
    const workoutPlan = await generateAIWorkoutPlan(customizations);
    
    const enrichedPlan = {
      id: planId, // Keep the same ID for customization
      ...workoutPlan,
      createdAt: new Date().toISOString()
    };

    res.json(enrichedPlan);
  } catch (error) {
    console.error('Error in customize-workout:', error);
    res.status(500).json({ 
      error: 'Failed to customize workout plan',
      message: error.message 
    });
  }
});

export default router;
