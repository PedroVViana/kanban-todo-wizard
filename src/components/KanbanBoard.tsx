import { useState } from "react";
import { TaskStatus, Task, useTaskStore } from "@/store/useTaskStore";
import { KanbanColumn } from "./KanbanColumn";
import { TaskDialog } from "./TaskDialog";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Quadro Kanban</h2>
        <p className="text-muted-foreground">
          Organize suas tarefas arrastando-as entre as colunas.
        </p>
        <Separator className="my-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <KanbanColumn
          title="A Fazer"
          status="todo"
          tasks={todoTasks}
          onAddTask={() => handleAddTask("todo")}
          onEditTask={handleEditTask}
          color="bg-blue-500/10 border-blue-500/20"
          icon="circle-check"
        />
        <KanbanColumn
          title="Em Progresso"
          status="inProgress"
          tasks={inProgressTasks}
          onAddTask={() => handleAddTask("inProgress")}
          onEditTask={handleEditTask}
          color="bg-amber-500/10 border-amber-500/20"
          icon="circle-half"
        />
        <KanbanColumn
          title="Concluídas"
          status="completed"
          tasks={completedTasks}
          onAddTask={() => handleAddTask("completed")}
          onEditTask={handleEditTask}
          color="bg-green-500/10 border-green-500/20"
          icon="check-circle"
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
