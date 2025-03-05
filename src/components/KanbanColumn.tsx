
import { useRef, useState } from "react";
import { TaskStatus, Task, useTaskStore } from "@/store/useTaskStore";
import { TaskCard } from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const statusColors: Record<TaskStatus, string> = {
  todo: "border-blue-200 bg-kanban-blue",
  inProgress: "border-yellow-200 bg-kanban-yellow",
  completed: "border-green-200 bg-kanban-green"
};

const statusBorderColors: Record<TaskStatus, string> = {
  todo: "border-kanban-blue-border",
  inProgress: "border-kanban-yellow-border",
  completed: "border-kanban-green-border"
};

export function KanbanColumn({ 
  title, 
  status, 
  tasks, 
  onAddTask, 
  onEditTask 
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const moveTask = useTaskStore((state) => state.moveTask);
  const columnRef = useRef<HTMLDivElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };
  
  const handleDragLeave = () => {
    setIsOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    
    try {
      const taskData = JSON.parse(e.dataTransfer.getData('application/json')) as Task;
      
      if (taskData.status !== status) {
        moveTask(taskData.id, status);
      }
    } catch (error) {
      console.error("Error processing drop:", error);
    }
  };
  
  return (
    <div 
      ref={columnRef}
      className={`kanban-column p-4 rounded-xl border ${statusBorderColors[status]} ${statusColors[status]} 
      ${isOver ? "ring-2 ring-primary/20" : ""} transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm">
          {title} <span className="ml-2 text-muted-foreground">({tasks.length})</span>
        </h3>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0 rounded-full" 
          onClick={onAddTask}
          aria-label={`Add task to ${title}`}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      <Separator className="mb-4 bg-black/5" />
      
      <div className="space-y-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-14rem)] p-0.5">
        {tasks.map((task) => (
          <div key={task.id} className="task-enter">
            <TaskCard task={task} onEdit={onEditTask} />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="py-8 px-2 flex flex-col items-center text-center">
            <p className="text-muted-foreground text-sm">No tasks yet</p>
            <p className="text-xs text-muted-foreground mt-1">Drag tasks here or add a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
