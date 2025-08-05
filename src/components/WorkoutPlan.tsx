import { useState } from 'react';
import { Clock, Target, RefreshCw, Download, ChevronDown, ChevronUp } from 'lucide-react';
import type { WorkoutPlan } from '../types/index';

interface WorkoutPlanProps {
  plan: WorkoutPlan;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function WorkoutPlan({ plan, onRegenerate, isRegenerating }: WorkoutPlanProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);

  const toggleDayExpansion = (dayIndex: number) => {
    setExpandedDays(prev =>
      prev.includes(dayIndex)
        ? prev.filter(i => i !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const exportPlan = () => {
    const content = `
WORKOUT PLAN: ${plan.name}

${plan.description}

Duration: ${plan.duration}
Difficulty: ${plan.difficulty}

${plan.days.map(day => `
DAY: ${day.day} - ${day.focus}
Duration: ${day.totalDuration} minutes

WARM-UP:
${day.warmup.map(w => `• ${w}`).join('\n')}

EXERCISES:
${day.exercises.map(ex => `
${ex.name}
• Sets: ${ex.sets} | Reps: ${ex.reps} | Rest: ${ex.restTime}
• Target: ${ex.targetMuscles.join(', ')}
• ${ex.description}
${ex.modifications?.easier ? `• Easier: ${ex.modifications.easier}` : ''}
${ex.modifications?.harder ? `• Harder: ${ex.modifications.harder}` : ''}
`).join('\n')}

COOL-DOWN:
${day.cooldown.map(c => `• ${c}`).join('\n')}
`).join('\n')}

TIPS:
${plan.tips.map(tip => `• ${tip}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.name.replace(/\s+/g, '_')}_workout_plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="opacity-90 mb-4">{plan.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span className="capitalize">{plan.difficulty}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
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

      {/* Workout Days */}
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
                  <p className="text-gray-600">{day.focus} • {day.totalDuration} minutes</p>
                </div>
                {expandedDays.includes(dayIndex) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedDays.includes(dayIndex) && (
                <div className="p-6 bg-white">
                  {/* Warm-up */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-700 mb-3">Warm-up</h4>
                    <ul className="space-y-1">
                      {day.warmup.map((exercise, i) => (
                        <li key={i} className="text-gray-700 text-sm">• {exercise}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercises */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-700 mb-4">Exercises</h4>
                    <div className="space-y-4">
                      {day.exercises.map((exercise, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{exercise.name}</h5>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {exercise.difficulty}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Sets:</span> {exercise.sets}
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Reps:</span> {exercise.reps}
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Rest:</span> {exercise.restTime}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{exercise.description}</p>
                          <div className="text-xs text-blue-600 mb-2">
                            <strong>Target:</strong> {exercise.targetMuscles.join(', ')}
                          </div>
                          {exercise.modifications && (
                            <div className="text-xs space-y-1">
                              {exercise.modifications.easier && (
                                <div className="text-green-600">
                                  <strong>Easier:</strong> {exercise.modifications.easier}
                                </div>
                              )}
                              {exercise.modifications.harder && (
                                <div className="text-red-600">
                                  <strong>Harder:</strong> {exercise.modifications.harder}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cool-down */}
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-3">Cool-down</h4>
                    <ul className="space-y-1">
                      {day.cooldown.map((exercise, i) => (
                        <li key={i} className="text-gray-700 text-sm">• {exercise}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        {plan.tips.length > 0 && (
          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3">💡 Pro Tips</h4>
            <ul className="space-y-2">
              {plan.tips.map((tip, i) => (
                <li key={i} className="text-blue-800 text-sm">• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}