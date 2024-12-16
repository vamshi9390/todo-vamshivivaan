import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={cn(
      "group flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200",
      completed && "bg-gray-50"
    )}>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="h-5 w-5 rounded-full border-2 border-primary"
        />
        <span className={cn(
          "text-gray-700 transition-all duration-200",
          completed && "line-through text-gray-400"
        )}>
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <X className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
      </button>
    </div>
  );
};

export default TodoItem;