import { create } from 'zustand';

export type GameState = 'menu' | 'playing' | 'gameover' | 'leaderboard';

export interface GameStore {
  gameState: GameState;
  score: number;       // Depth
  bestScore: number;
  inkMass: number;
  mutations: string[];
  
  setGameState: (state: GameState) => void;
  setScore: (score: number) => void;
  setInkMass: (mass: number) => void;
  addMutation: (mutation: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'menu',
  score: 0,
  bestScore: 0,
  inkMass: 100,
  mutations: [],

  setGameState: (state) => set({ gameState: state }),
  
  setScore: (score) => set((prev) => ({ 
    score, 
    bestScore: score > prev.bestScore ? score : prev.bestScore 
  })),
  
  setInkMass: (inkMass) => set({ inkMass }),
  
  addMutation: (mutation) => set((prev) => ({ 
    mutations: prev.mutations.includes(mutation) ? prev.mutations : [...prev.mutations, mutation] 
  })),
  
  resetGame: () => set({
    gameState: 'playing',
    score: 0,
    inkMass: 100,
    mutations: []
  })
}));
