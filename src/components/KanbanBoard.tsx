
import { useState } from "react";
import { TaskStatus, Task, useTaskStore } from "@/store/useTaskStore";
import { KanbanColumn } from "./KanbanColumn";
import { TaskDialog } from "./TaskDialog";

export function KanbanBoard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialStatus, setInitialStatus] = useState<TaskStatus>("todo");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const tasks = useTaskStore((state) => state.tasks);
  
  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setInitialStatus(status);
    setDialogOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };
  
  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <KanbanColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          onAddTask={() => handleAddTask("todo")}
          onEditTask={handleEditTask}
        />
        <KanbanColumn
          title="In Progress"
          status="inProgress"
          tasks={inProgressTasks}
          onAddTask={() => handleAddTask("inProgress")}
          onEditTask={handleEditTask}
        />
        <KanbanColumn
          title="Completed"
          status="completed"
          tasks={completedTasks}
          onAddTask={() => handleAddTask("completed")}
          onEditTask={handleEditTask}
        />
      </div>
      
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialStatus={initialStatus}
        editingTask={editingTask}
      />
    </div>
  );
}
