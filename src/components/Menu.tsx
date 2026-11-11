import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function Menu() {
  const { setGameState } = useGameStore();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6"
    >
      <div className="absolute top-4 right-4 z-20">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-md">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button 
              onClick={() => disconnect()}
              className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-md"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={() => connect({ connector: injected() })}
            className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 px-4 py-1.5 rounded-md shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="max-w-md w-full flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            ABYSSAL
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium tracking-widest text-slate-300">
            INK RUNNER
          </h2>
        </div>

        <p className="text-slate-400 text-center text-sm md:text-base px-4">
          Descend into the deepest trenches. Leave your mark in the ink-black void.
        </p>

        <div className="w-full space-y-4">
          <button 
            onClick={() => setGameState('playing')}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all text-white font-bold rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)]"
          >
            DIVE INTO THE ABYSS
          </button>
          
          <button 
            onClick={() => setGameState('leaderboard')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-slate-300 font-semibold rounded-lg border border-slate-700"
          >
            VIEW LEADERBOARD
          </button>
        </div>

        <div className="pt-8 text-xs text-slate-500 flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-cyan-500/30 rounded-full text-[11px] text-cyan-400 font-mono shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 duration-200"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Base Mainnet • Denim 200ms Canonical Blocks</span>
          </div>
          <div className="flex gap-4 text-slate-400 text-xs mt-1">
            <span>Tap / Space: Jump</span>
            <span>•</span>
            <span>Shift: Dash</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-600 font-mono">
            Builder: bc_w5vtza16 | Chain ID: 8453
          </p>
        </div>
      </div>
    </motion.div>
  );
}
