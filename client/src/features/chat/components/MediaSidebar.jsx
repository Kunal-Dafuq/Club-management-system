import { Image as ImageIcon } from "lucide-react";
import SharedMedia from "./SharedMedia";

export default function MediaSidebar({ open, roomId }) {
    if (!open) return null;

    return (
        <div className="w-80 border-l border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden shrink-0 transition-all duration-300">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-2 shrink-0">
                <div className="p-1.5 bg-violet-500/10 text-violet-400 rounded-lg">
                    <ImageIcon size={18} />
                </div>
                <h2 className="font-bold text-white text-lg tracking-tight">
                    Shared Media
                </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <SharedMedia roomId={roomId} />
            </div>
        </div>
    );
}