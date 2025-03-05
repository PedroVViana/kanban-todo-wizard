
import { Task, TaskPriority, useTaskStore } from "@/store/useTaskStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2 } from "lucide-react";
import { useState, useRef } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef<number | null>(null);
  
  const formattedDate = new Intl.DateTimeFormat('default', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(task.createdAt));

  const handleDragStart = (e: React.DragEvent) => {
    // For iOS Safari compatibility
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/json', JSON.stringify(task));
    }
    
    setIsDragging(true);
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    
    // Add the task ID as a class to the ghost image
    const ghostImage = document.createElement('div');
    ghostImage.classList.add('invisible');
    document.body.appendChild(ghostImage);
    e.dataTransfer.setDragImage(ghostImage, 0, 0);
    
    // Remove the ghost element
    requestAnimationFrame(() => {
      document.body.removeChild(ghostImage);
    });
  };

  const handleDragEnd = () => {
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = window.setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  return (
    <Card 
      className={`task-card mb-3 w-full ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className={`${priorityColors[task.priority]} px-2 py-0.5 text-xs font-medium rounded-full`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        </div>
        <CardTitle className="text-base mt-2 text-left">{task.title}</CardTitle>
        {task.description && (
          <CardDescription className="text-xs mt-1 text-left line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="p-2 flex justify-end gap-2">
        <button 
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button 
          onClick={() => deleteTask(task.id)}
          className="p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}
