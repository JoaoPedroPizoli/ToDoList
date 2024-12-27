import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface NewGoalDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: {
    name: string;
    targetDate: Date;
    targetWeight: number;
    tasks: string[];
  }) => void;
}

const NewGoalDialog = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: NewGoalDialogProps) => {
  const [name, setName] = React.useState("");
  const [targetDate, setTargetDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [targetWeight, setTargetWeight] = React.useState("");
  const [tasks, setTasks] = React.useState([""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && targetDate && targetWeight) {
      onSubmit({
        name,
        targetDate,
        targetWeight: Number(targetWeight),
        tasks: tasks.filter((task) => task.trim() !== ""),
      });
      onOpenChange(false);
    }
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter goal name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Target Date</Label>
              <DatePicker
                date={targetDate}
                onDateChange={setTargetDate}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetWeight">Target Weight (kg)</Label>
              <Input
                id="targetWeight"
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter target weight"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Daily Tasks</Label>
              {tasks.map((task, index) => (
                <Input
                  key={index}
                  value={task}
                  onChange={(e) => updateTask(index, e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white mb-2"
                  placeholder={`Task ${index + 1}`}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addTask}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
              >
                Add Task
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white"
            >
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGoalDialog;
