import { Users, Shield, User } from "lucide-react";

const MembersList = ({ members = [] }) => {
  
  const getRoleStyle = (role) => {
    switch (role?.toUpperCase()) {
      case "COORDINATOR":
      case "ADMIN":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 text-violet-500 rounded-lg">
            <Users size={24} />
          </div>
          Directory
        </h2>
        <span className="text-sm font-medium text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">
          {members.length} Total
        </span>
      </div>

      {members.length === 0 ? (
        <p className="text-zinc-500 text-center py-6">No active members found.</p>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800/50 p-3 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                  <User size={20} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {member.user?.name || "Unknown User"}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {member.user?.department || "No Department"}
                  </p>
                </div>
              </div>

              <span
                className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${getRoleStyle(member.clubRole)}`}
              >
                {member.clubRole === "COORDINATOR" ? <Shield size={12} /> : null}
                {member.clubRole}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList;