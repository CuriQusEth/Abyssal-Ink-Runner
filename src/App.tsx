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

