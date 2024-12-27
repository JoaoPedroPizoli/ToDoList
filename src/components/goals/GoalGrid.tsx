import React from "react";
import GoalCard from "./GoalCard";

interface Goal {
  id: string;
  name: string;
  dueDate: string;
  progress: number;
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  currentWeight: number;
  targetWeight: number;
}

interface GoalGridProps {
  goals?: Goal[];
  onTaskToggle?: (goalId: string, taskId: string, completed: boolean) => void;
}

const GoalGrid = ({
  goals = [
    {
      id: "1",
      name: "Weight Loss Goal",
      dueDate: "2024-12-31",
      progress: 65,
      tasks: [
        { id: "1", title: "Morning Run", completed: true },
        { id: "2", title: "Healthy Breakfast", completed: false },
        { id: "3", title: "Evening Workout", completed: false },
      ],
      currentWeight: 75,
      targetWeight: 70,
    },
    {
      id: "2",
      name: "Muscle Gain",
      dueDate: "2024-11-30",
      progress: 40,
      tasks: [
        { id: "1", title: "Protein Intake", completed: true },
        { id: "2", title: "Gym Session", completed: true },
        { id: "3", title: "Rest Day", completed: false },
      ],
      currentWeight: 65,
      targetWeight: 72,
    },
    {
      id: "3",
      name: "Flexibility Goal",
      dueDate: "2024-10-15",
      progress: 25,
      tasks: [
        { id: "1", title: "Morning Stretch", completed: false },
        { id: "2", title: "Yoga Session", completed: false },
        { id: "3", title: "Cool Down", completed: true },
      ],
      currentWeight: 68,
      targetWeight: 68,
    },
  ],
  onTaskToggle = () => {},
}: GoalGridProps) => {
  return (
    <div className="w-full min-h-screen bg-[#121212] p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {goals.map((goal) => (
          <div key={goal.id} className="w-full flex justify-center">
            <GoalCard
              id={goal.id}
              name={goal.name}
              dueDate={goal.dueDate}
              progress={goal.progress}
              tasks={goal.tasks}
              currentWeight={goal.currentWeight}
              targetWeight={goal.targetWeight}
              onTaskToggle={(taskId, completed) =>
                onTaskToggle(goal.id, taskId, completed)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalGrid;
