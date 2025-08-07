import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, RotateCcw } from 'lucide-react';
import type { WorkoutPlan } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ plan }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {plan.duration}
          </span>
          <span className="capitalize">{plan.level} Level</span>
          <span>{plan.days.length} Days</span>
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
                <p className="text-sm text-gray-600">{day.focus}</p>
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
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div
                        key={exerciseIndex}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                          <div className="text-sm text-gray-600 text-right">
                            <div>{exercise.sets} sets × {exercise.reps}</div>
                            <div className="flex items-center mt-1">
                              <RotateCcw className="h-3 w-3 mr-1" />
                              {exercise.restTime}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                        {exercise.modifications && (
                          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                            <strong>Modifications:</strong> {exercise.modifications}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanCard;