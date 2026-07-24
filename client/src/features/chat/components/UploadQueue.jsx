import React from "react";

const UploadQueue = ({ uploads, onCancel }) => {
  if (!uploads.length) return null;

  return (
    <div className="mb-3 space-y-2">
      {uploads.map((file) => (
        <div
          key={file.id}
          className="rounded-xl border border-white/10 bg-zinc-900/80 p-3"
        >
          <div className="flex justify-between items-center">
            <div className="truncate text-sm text-white">
              {file.name}
            </div>

            <button
              onClick={() => onCancel(file.id)}
              className="text-red-400 text-xs hover:text-red-300"
            >
              Cancel
            </button>
          </div>

          <div className="mt-2 h-2 rounded bg-zinc-700 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${file.progress}%`,
              }}
            />
          </div>

          <div className="mt-1 text-xs text-zinc-400">
            {file.progress}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadQueue;