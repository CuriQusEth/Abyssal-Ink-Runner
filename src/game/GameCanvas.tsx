import React, { useEffect, useRef } from 'react';
import { GameEngine } from './Engine';
import { useGameStore } from '../store/useGameStore';

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const { setGameState, setScore, setInkMass, gameState } = useGameStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize Engine
    engineRef.current = new GameEngine(
      canvasRef.current,
      () => setGameState('gameover'),
      (score) => setScore(score),
      (mass) => setInkMass(mass)
    );

    const handleResize = () => {
      engineRef.current?.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => {
      window.removeEventListener('resize', handleResize);
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, [setGameState, setScore, setInkMass]);

  useEffect(() => {
    if (gameState === 'playing' && engineRef.current && !engineRef.current.isRunning) {
      engineRef.current.start();
    }
  }, [gameState]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (gameState !== 'playing' || !engineRef.current) return;
    engineRef.current.jump();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (gameState !== 'playing' || !engineRef.current) return;
    // Optional: could add swipe/hold logic for dashing
  };

  // Setup keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || !engineRef.current) return;
      if (e.code === 'Space') engineRef.current.jump();
      if (e.code === 'ShiftLeft' || e.code === 'KeyD') engineRef.current.dash();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full touch-none ${gameState === 'playing' ? 'cursor-none' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    />
  );
}
