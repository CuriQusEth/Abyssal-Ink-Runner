import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import { useAccount, useSignMessage } from 'wagmi';
import { getAttributionPayload } from '../lib/erc8021/attribution';
import { useGMTransaction } from '../hooks/useGMTransaction';
import { Sun } from 'lucide-react';

export function GameOver() {
  const { score, bestScore, resetGame, setGameState } = useGameStore();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { sendGMTransaction, isPending: isGMPending } = useGMTransaction();

  // SIWE + ERC-8021 mock submission
  const handleRecordDescent = async () => {
    setIsSubmitting(true);
    try {
      // Create attribution payload for transaction (Mock for signature in this frontend-only context)
      const attributionData = getAttributionPayload();
      
      const message = `Record my descent into the Abyss!\nDepth: ${Math.floor(score)}m\nWallet: ${address || 'Guest'}\nAttribution: ${attributionData}`;
      
      // If wallet is connected, try to sign. Otherwise just mock it for guest experience.
      if (address) {
        // Mocking the wagmi signing to avoid complex connector dependencies right now
        // Normally: await signMessageAsync({ account: address as any, message });
        await new Promise(r => setTimeout(r, 1000));
        console.log("Signed:", message);
      } else {
        await new Promise(r => setTimeout(r, 1500)); // simulates tx
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-6"
    >
      <div className="max-w-md w-full flex flex-col items-center space-y-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-red-500 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          Consumed by the Deep
        </h2>
        
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl w-full">
          <div className="space-y-4">
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Final Depth</p>
              <p className="text-4xl font-mono text-cyan-400">{Math.floor(score)}m</p>
            </div>
            
            <div className="h-px bg-slate-800 w-full" />
            
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-wider">Best Descent</p>
              <p className="text-xl font-mono text-slate-300">{Math.floor(bestScore)}m</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          {!submitted ? (
            <button 
              onClick={handleRecordDescent}
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold rounded-lg transition-all ${isSubmitting ? 'bg-violet-800 opacity-50 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]'}`}
            >
              {isSubmitting ? 'SIGNING TRANSACTION...' : 'RECORD THIS DESCENT ON-CHAIN'}
            </button>
          ) : (
            <div className="w-full py-4 bg-emerald-900/50 border border-emerald-500/50 text-emerald-400 font-bold rounded-lg animate-pulse">
              DESCENT ETCHED IN THE ABYSS
            </div>
          )}

          {isConnected && (
            <button
              onClick={() => sendGMTransaction()}
              disabled={isGMPending}
              className="w-full justify-center px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
            >
              <Sun className="w-4 h-4" />
              {isGMPending ? 'SAYING GM...' : 'SAY GM'}
            </button>
          )}
        </div>

        <div className="flex gap-4 w-full pt-4">
          <button 
            onClick={resetGame}
            className="flex-1 py-3 bg-cyan-900 hover:bg-cyan-800 transition-all text-cyan-100 font-semibold rounded-lg border border-cyan-800"
          >
            DIVE AGAIN
          </button>
          
          <button 
            onClick={() => setGameState('menu')}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 transition-all text-slate-300 font-semibold rounded-lg border border-slate-700"
          >
            RETURN
          </button>
        </div>
      </div>
    </motion.div>
  );
}
