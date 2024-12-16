import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import TodoFilter from "@/components/TodoFilter";
import EmptyState from "@/components/EmptyState";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to load todos",
      });
      return;
    }

    setTodos(data || []);
  };

  const addTodo = async (text: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('todos')
      .insert([
        { text, completed: false, user_id: user.id }
      ])
      .select()
      .single();

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to add todo",
      });
      return;
    }

    setTodos(prev => [data, ...prev]);
    toast({
      description: "Task added successfully",
    });
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to update todo",
      });
      return;
    }

    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete todo",
      });
      return;
    }

    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      description: "Task deleted successfully",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
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
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo List</h1>
              <p className="text-gray-500">Stay organized and productive</p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="ml-4"
            >
              Sign out
            </Button>
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