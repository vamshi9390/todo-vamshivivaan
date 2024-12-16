import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <div className="flex justify-center gap-2">
      {(['all', 'active', 'completed'] as FilterType[]).map((filter) => (
        <Button
          key={filter}
          variant="ghost"
          onClick={() => onFilterChange(filter)}
          className={cn(
            "capitalize",
            currentFilter === filter && "bg-primary/10 text-primary"
          )}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilter;