import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingActionButtonProps {
  onClick?: () => void;
  tooltipText?: string;
}

const FloatingActionButton = ({
  onClick = () => {},
  tooltipText = "Add New Goal",
}: FloatingActionButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#2196F3] hover:bg-[#1976D2] shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            onClick={onClick}
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingActionButton;
