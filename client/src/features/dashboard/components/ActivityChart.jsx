import { Activity } from "lucide-react";

const ActivityChart = () => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity size={20} className="text-blue-500" />
          Engagement Overview
        </h2>
        <select className="bg-zinc-800 border-none text-xs text-zinc-300 rounded-md px-3 py-1 outline-none">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
        <p className="text-zinc-500 text-sm font-medium">
          Chart Integration Pending (e.g., Recharts)
        </p>
      </div>
    </div>
  );
};

export default ActivityChart;