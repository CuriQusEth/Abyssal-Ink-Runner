import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { baseDenimChain } from '../lib/baseDenim';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000,
    },
  },
});

// Configure Wagmi for Base Mainnet with Denim (200ms canonical blocks)
export const config = createConfig({
  chains: [baseDenimChain],
  pollingInterval: 200, // 200ms polling aligned with Denim canonical blocks
  transports: {
    [baseDenimChain.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      timeout: 10_000,
    }),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
