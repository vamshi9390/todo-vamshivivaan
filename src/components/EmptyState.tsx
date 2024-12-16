import { ClipboardList } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <ClipboardList className="h-16 w-16 mb-4 text-gray-300" />
      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
      <p className="text-sm">Add your first task above to get started</p>
    </div>
  );
};

export default EmptyState;