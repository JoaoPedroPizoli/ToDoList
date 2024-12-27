import React, { useState } from "react";
import GoalGrid from "./goals/GoalGrid";
import FloatingActionButton from "./goals/FloatingActionButton";
import NewGoalDialog from "./goals/NewGoalDialog";

interface HomeProps {
  initialGoals?: Array<{
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
  }>;
}

const Home = ({
  initialGoals = [
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
  ],
}: HomeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goals, setGoals] = useState(initialGoals);

  const handleNewGoal = (data: {
    name: string;
    targetDate: Date;
    targetWeight: number;
    tasks: string[];
  }) => {
    const newGoal = {
      id: (goals.length + 1).toString(),
      name: data.name,
      dueDate: data.targetDate.toISOString().split("T")[0],
      progress: 0,
      tasks: data.tasks.map((task, index) => ({
        id: index.toString(),
        title: task,
        completed: false,
      })),
      currentWeight: goals[0]?.currentWeight || 70,
      targetWeight: data.targetWeight,
    };

    setGoals([...goals, newGoal]);
  };

  const handleTaskToggle = (
    goalId: string,
    taskId: string,
    completed: boolean,
  ) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTasks = goal.tasks.map((task) =>
            task.id === taskId ? { ...task, completed } : task,
          );

          // Calculate new progress based on completed tasks
          const completedTasks = updatedTasks.filter(
            (task) => task.completed,
          ).length;
          const totalTasks = updatedTasks.length;
          const newProgress = Math.round((completedTasks / totalTasks) * 100);

          return {
            ...goal,
            tasks: updatedTasks,
            progress: newProgress,
          };
        }
        return goal;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter">
      <header className="p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Goal Tracking Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <GoalGrid goals={goals} onTaskToggle={handleTaskToggle} />
        <FloatingActionButton onClick={() => setIsDialogOpen(true)} />
        <NewGoalDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleNewGoal}
        />
      </main>
    </div>
  );
};

export default Home;
