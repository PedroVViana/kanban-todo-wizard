
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TaskDialog } from "./TaskDialog";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between py-4 px-6 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""
      )}
    >
      <div className="flex items-center">
        <h1 className="text-xl font-medium">Gerenciador de Tarefas</h1>
      </div>
      
      <Button onClick={() => setDialogOpen(true)} className="gap-1.5">
        <PlusIcon size={16} />
        <span>Nova Tarefa</span>
      </Button>
      
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </header>
  );
}
