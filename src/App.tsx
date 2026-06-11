/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Providers } from './components/Providers';
import { useGameStore } from './store/useGameStore';
import { GameCanvas } from './game/GameCanvas';
import { Menu } from './components/Menu';
import { HUD } from './components/HUD';
import { GameOver } from './components/GameOver';
import { Leaderboard } from './components/Leaderboard';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useGMTransaction } from './hooks/useGMTransaction';
import { Sun } from 'lucide-react';

function GlobalControls() {
  const { isConnected } = useAccount();
  const { sendGMTransaction, isPending } = useGMTransaction();

  if (!isConnected) return null;

  return (
    <div className="absolute bottom-4 right-4 z-50">
      <button
        onClick={() => sendGMTransaction()}
        disabled={isPending}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun className="w-4 h-4" />
        {isPending ? 'SAYING GM...' : 'SAY GM'}
      </button>
    </div>
  );
}

function GameOrchestrator() {
  const { gameState } = useGameStore();

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      <GameCanvas />
      
      {gameState === 'playing' && <HUD />}
      
      <AnimatePresence>
        {gameState === 'menu' && <Menu />}
        {gameState === 'gameover' && <GameOver />}
        {gameState === 'leaderboard' && <Leaderboard />}
      </AnimatePresence>
      
      <GlobalControls />
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <GameOrchestrator />
    </Providers>
  );
}

