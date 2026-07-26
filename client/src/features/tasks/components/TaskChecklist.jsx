import { useState } from "react";
import { Plus, ListChecks } from "lucide-react";

export default function TaskChecklist() {
    const [items, setItems] = useState([]);

    const add = () => {
        setItems([
            ...items,
            { title: "", done: false }
        ]);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ListChecks size={20} className="text-violet-400" />
                Checklist
            </h3>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-violet-600 focus:ring-violet-500 focus:ring-offset-zinc-950 cursor-pointer transition-all"
                        />
                        <input
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all group-hover:border-zinc-600"
                            placeholder="Add item..."
                            defaultValue={item.title}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={add}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-lg transition-colors mt-2 border border-zinc-700 hover:border-zinc-600"
            >
                <Plus size={16} />
                Add Item
            </button>
        </div>
    );
}