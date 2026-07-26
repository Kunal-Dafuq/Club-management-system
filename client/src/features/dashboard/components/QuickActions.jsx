import { useNavigate } from "react-router-dom";
import { Search, Plus, User } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
      <button
        onClick={() => navigate("/clubs")}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        <Search size={16} />
        Explore
      </button>

      <button
        onClick={() => navigate("/events")}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        <Plus size={16} />
        Events
      </button>

      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        <User size={16} />
        Profile
      </button>
    </div>
  );
};

export default QuickActions;