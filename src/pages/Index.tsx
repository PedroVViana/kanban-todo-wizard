
import { KanbanBoard } from "@/components/KanbanBoard";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-6 px-4 md:px-6">
        <KanbanBoard />
      </main>
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>Gerenciador de Tarefas com Kanban • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
