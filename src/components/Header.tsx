import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, CheckSquare, Moon, Sun } from "lucide-react";
import { TaskDialog } from "./TaskDialog";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
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
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between py-4 px-6 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""
      )}
    >
      <div className="flex items-center gap-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Gerenciador de Tarefas</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        <Button onClick={() => setDialogOpen(true)} className="gap-1.5">
          <PlusIcon size={16} />
          <span>Nova Tarefa</span>
        </Button>
      </div>
      
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </header>
  );
}
