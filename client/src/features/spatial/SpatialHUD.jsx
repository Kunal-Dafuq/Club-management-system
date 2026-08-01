import { useState } from "react";
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowLeft,
  HelpCircle,
  Zap,
  Activity,
  Layers,
  MapPin,
  ExternalLink,
  Train,
} from "lucide-react";
import { spatialAudio } from "./audioManager";
import { METRO_LINES } from "./metroData";

export default function SpatialHUD({
  activeLineId,
  onSelectMetroLine,
  currentSegment,
  onSelectSegment,
  inRoom,
  onExitRoom,
  hasEnteredGates,
}) {
  const [muted, setMuted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleToggleAudio = () => {
    const next = spatialAudio.toggleMute();
    setMuted(next);
  };

  const currentLine = METRO_LINES[activeLineId] || METRO_LINES.LINE_A;
  const stations = currentLine.stations || [];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-5 select-none font-mono">
      {/* Top Bar */}
      <div className="flex items-start justify-between gap-4">
        {/* Left: Branding & Back to 2D Dashboard */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 pointer-events-auto">
          <a
            href="/dashboard"
            onClick={() => spatialAudio.playClick()}
            className="px-4 py-2 rounded-2xl bg-black/70 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>2D Dashboard</span>
          </a>

          <div className="px-3.5 py-2 rounded-2xl bg-black/70 border border-cyan-400/40 text-xs font-bold text-cyan-300 flex items-center gap-2 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Train className="w-4 h-4 text-cyan-400" />
            <span>CLUBPLANET METRO TUNNEL v2.6</span>
          </div>
        </div>

        {/* Center: Metro Line Switcher Tabs */}
        <div className="hidden lg:flex items-center gap-2 bg-black/80 border border-white/15 p-1.5 rounded-2xl backdrop-blur-2xl pointer-events-auto shadow-2xl">
          {Object.values(METRO_LINES).map((line) => {
            const isActive = line.id === activeLineId;
            return (
              <button
                key={line.id}
                onClick={() => {
                  spatialAudio.playTeleport();
                  onSelectMetroLine(line.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? `${line.bgClass} shadow-lg scale-105`
                    : "bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>{line.shortName}</span>
                <span className="text-[10px] opacity-75">({line.badge})</span>
              </button>
            );
          })}
        </div>

        {/* Right: Audio Toggle & FPS Telemetry SLA */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2.5 rounded-2xl bg-black/70 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white transition-colors backdrop-blur-xl"
            title="Keyboard Shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleAudio}
            className="px-3.5 py-2 rounded-2xl bg-black/70 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-colors flex items-center gap-2 backdrop-blur-xl"
          >
            {muted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-zinc-400">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Audio ON</span>
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/70 border border-emerald-400/40 text-xs font-bold text-emerald-300 backdrop-blur-xl">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>60 FPS SLA</span>
          </div>
        </div>
      </div>

      {/* Mobile Metro Line Switcher Tabs (Shows on tablets/phones) */}
      <div className="flex lg:hidden justify-center my-2 pointer-events-auto">
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-black/85 border border-white/15 p-1.5 rounded-2xl backdrop-blur-2xl shadow-xl max-w-full">
          {Object.values(METRO_LINES).map((line) => {
            const isActive = line.id === activeLineId;
            return (
              <button
                key={line.id}
                onClick={() => {
                  spatialAudio.playTeleport();
                  onSelectMetroLine(line.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer border ${
                  isActive
                    ? `${line.bgClass}`
                    : "bg-transparent border-transparent text-zinc-400"
                }`}
              >
                <span>{line.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help Slideover / Modal */}
      {showHelp && (
        <div className="absolute top-20 right-5 max-w-xs w-full p-6 rounded-3xl bg-black/95 border border-cyan-400/40 text-zinc-300 text-xs space-y-3 pointer-events-auto backdrop-blur-2xl shadow-2xl">
          <div className="flex justify-between items-center text-white font-bold">
            <span>METRO TUNNEL CONTROLS</span>
            <button onClick={() => setShowHelp(false)} className="text-zinc-400 hover:text-white">✕</button>
          </div>
          <div className="space-y-2 text-zinc-400">
            <div>• <strong className="text-cyan-300">Switch Lines:</strong> Click Line A, B, or C</div>
            <div>• <strong className="text-violet-300">Scroll / Drag:</strong> Glide down tunnel</div>
            <div>• <strong className="text-emerald-300">Click Station:</strong> Teleport into Pod</div>
            <div>• <strong className="text-amber-300">ESC / Back:</strong> Return to Rails</div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Mini-Map Station Pills for Active Metro Line */}
      <div className="flex items-center justify-center gap-3 w-full pointer-events-auto">
        {inRoom ? (
          <button
            onClick={() => {
              spatialAudio.playTeleport();
              onExitRoom();
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-xs shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO METRO TUNNEL RAILS</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 bg-black/85 border border-white/15 px-3 py-2 rounded-2xl backdrop-blur-2xl shadow-2xl max-w-4xl">
            <span className="text-[10px] text-zinc-400 px-2 uppercase font-bold">
              {currentLine.shortName} STATIONS:
            </span>

            {/* Gate Station Button */}
            <button
              onClick={() => {
                spatialAudio.playClick();
                onSelectSegment(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                currentSegment === 0
                  ? "bg-white/20 border-white/40 text-white shadow-lg"
                  : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              00. GATES
            </button>

            {stations.map((stn) => {
              const active = currentSegment === stn.index;
              return (
                <button
                  key={stn.id}
                  onClick={() => {
                    spatialAudio.playClick();
                    onSelectSegment(stn.index);
                  }}
                  disabled={!hasEnteredGates}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                    active
                      ? `${currentLine.bgClass} shadow-lg scale-105`
                      : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
                  } ${!hasEnteredGates ? "opacity-35 cursor-not-allowed" : ""}`}
                >
                  {stn.title}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
