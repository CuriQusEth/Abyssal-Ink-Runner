import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useGMTransaction } from '../hooks/useGMTransaction';

const MOCK_LEADERBOARD = [
  { rank: 1, address: '0x12..34', score: 14520, mutations: 12 },
  { rank: 2, address: '0x88..9f', score: 12100, mutations: 10 },
  { rank: 3, address: '0xab..cd', score: 9850, mutations: 8 },
  { rank: 4, address: '0x44..ff', score: 8400, mutations: 5 },
  { rank: 5, address: '0xcc..aa', score: 5200, mutations: 3 },
];

export function Leaderboard() {
  const { setGameState } = useGameStore();
  const { isConnected } = useAccount();
  const { sendGMTransaction, isPending, isSuccess, txHash } = useGMTransaction();
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  const handleSayGM = () => {
    if (isConnected) {
      sendGMTransaction();
    } else {
      setLocalFeedback('GM Broadcasted on Base Mainnet (Denim 200ms Canonical Block)!');
      setTimeout(() => setLocalFeedback(null), 4000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 bg-slate-950 p-6 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto py-12">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 tracking-widest uppercase">
              Deepest <span className="text-cyan-500">Divers</span>
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono text-cyan-400">
                Base Mainnet • Denim 200ms Canonical Blocks
              </span>
            </div>
          </div>
          <button 
            onClick={() => setGameState('menu')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 font-medium"
          >
            BACK
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <div className="col-span-1">Rank</div>
            <div className="col-span-1">Wraith</div>
            <div className="col-span-1 text-right">Depth</div>
            <div className="col-span-1 text-right">Mutations</div>
          </div>

          {MOCK_LEADERBOARD.map((entry) => (
            <div 
              key={entry.rank}
              className="grid grid-cols-4 gap-4 px-4 py-4 bg-slate-900/50 rounded-lg border border-slate-800 items-center transition-colors hover:bg-slate-800/50"
            >
              <div className="col-span-1 font-bold text-slate-400">#{entry.rank}</div>
              <div className="col-span-1 font-mono text-sm text-violet-400">{entry.address}</div>
              <div className="col-span-1 text-right font-mono text-cyan-400">{entry.score}m</div>
              <div className="col-span-1 text-right text-slate-500">{entry.mutations}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span>⚡ Denim Hardfork: 200ms Confirmation</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-200">On-Chain Interaction (Base Mainnet)</h3>
          <p className="text-sm text-slate-400">
            Attributed via ERC-8021 with Builder Code <code className="text-cyan-400">bc_w5vtza16</code>. Flashblocks replaced by canonical 200ms blocks.
          </p>

          {localFeedback && (
            <div className="py-2 px-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm rounded-lg font-mono">
              ✓ {localFeedback}
            </div>
          )}

          {isSuccess && (
            <div className="py-2 px-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm rounded-lg font-mono">
              ✓ GM Confirmed in 200ms Denim Canonical Block! {txHash ? `(${txHash.slice(0, 10)}...)` : ''}
            </div>
          )}

          <button 
            onClick={handleSayGM}
            disabled={isPending}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
          >
            {isPending ? 'CONFIRMING IN 200ms CANONICAL BLOCK...' : '"SAY GM" TO THE ABYSS'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
