import { defineChain } from 'viem';
import { base as baseDefault } from 'viem/chains';

/**
 * Base Mainnet with Denim Upgrade Configuration
 * Denim activated on Base Mainnet on November 5, 2026 at 18:00 UTC.
 * Replaced Flashblocks with native 200ms canonical blocks.
 */
export const BASE_DENIM_INFO = {
  network: 'Base Mainnet',
  chainId: 8453,
  upgrade: 'Denim',
  activationDate: '2026-11-05T18:00:00Z',
  blockTimeMs: 200, // 200ms canonical blocks
  blockTimeSec: 0.2,
  flashblocksRetired: true,
  consensus: 'Canonical 200ms Native Blocks',
  rpcUrl: 'https://mainnet.base.org',
  explorerUrl: 'https://basescan.org',
  builderCode: 'bc_w5vtza16',
};

// Customized Base Chain definition with 200ms block timing for Denim
export const baseDenimChain = defineChain({
  ...baseDefault,
  id: 8453,
  name: 'Base Mainnet (Denim)',
  network: 'base-mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
  fees: {
    ...baseDefault.fees,
  },
});
