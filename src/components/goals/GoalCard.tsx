import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface GoalCardProps {
  id?: string;
  name?: string;
  dueDate?: string;
  progress?: number;
  tasks?: Task[];
  currentWeight?: number;
  targetWeight?: number;
  onTaskToggle?: (taskId: string, completed: boolean) => void;
}

const GoalCard = ({
  id = "1",
  name = "Weight Loss Goal",
  dueDate = "2024-12-31",
  progress = 65,
  tasks = [
    { id: "1", title: "Morning Run", completed: true },
    { id: "2", title: "Healthy Breakfast", completed: false },
    { id: "3", title: "Evening Workout", completed: false },
  ],
  currentWeight = 75,
  targetWeight = 70,
  onTaskToggle = () => {},
}: GoalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate remaining time
  const remainingDays = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Card className="w-full max-w-[400px] bg-[#121212] text-white hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold font-inter">{name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        <p className="text-sm text-gray-400">{remainingDays} days remaining</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </div>

          {isExpanded && (
            <div className="space-y-4 mt-4 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <h4 className="font-medium">Daily Tasks</h4>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-gray-800 p-2 rounded-md min-h-[44px]"
                    >
                      <span
                        className={
                          task.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {task.title}
                      </span>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="h-5 w-5 rounded border-gray-600"
                        onChange={(e) =>
                          onTaskToggle(task.id, e.target.checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Weight Tracking</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-800 p-3 rounded-md">
                  <div>
                    <p className="text-sm text-gray-400">Current</p>
                    <p className="font-semibold">{currentWeight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Target</p>
                    <p className="font-semibold">{targetWeight} kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
