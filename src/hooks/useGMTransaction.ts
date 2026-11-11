import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { getAttributionPayload } from '../lib/erc8021/attribution';

const GM_CONTRACT_ADDRESS = '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3';

export function useGMTransaction() {
  const { data: hash, sendTransaction, isPending, isSuccess: isSent, error } = useSendTransaction();

  // Denim 200ms block receipt tracking
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 200, // Denim 200ms canonical block resolution
  });

  const sendGMTransaction = () => {
    const data = getAttributionPayload();
    sendTransaction({
      to: GM_CONTRACT_ADDRESS,
      value: parseEther('0'), // Sending 0 ETH, just data/trigger
      data: data as `0x${string}`, // attach ERC8021 payload
    });
  };

  return {
    sendGMTransaction,
    isPending: isPending || isConfirming,
    isSuccess: isConfirmed || isSent,
    txHash: hash,
    error,
  };
}
