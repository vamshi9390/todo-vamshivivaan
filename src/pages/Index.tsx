import { useEffect, useState } from "react";
import TodoItem from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import TodoFilter from "@/components/TodoFilter";
import EmptyState from "@/components/EmptyState";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text,
      completed: false
    }]);
    toast({
      description: "Task added successfully",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      description: "Task deleted successfully",
      variant: "destructive",
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo List</h1>
            <p className="text-gray-500">Stay organized and productive</p>
          </div>
          
          <TodoInput onAdd={addTodo} />
          
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="space-y-3">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;