import React from 'react';
import { useGameStore } from '../store/useGameStore';

export function HUD() {
  const { score, inkMass } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-between items-start">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Depth</span>
        <span className="text-2xl md:text-4xl font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          {Math.floor(score)}m
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-full text-[11px] font-mono text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>Base Mainnet (Denim 200ms)</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">Ink Mass</span>
        <div className="w-32 h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, (inkMass / 200) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
