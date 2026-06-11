import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { getAttributionPayload } from '../lib/erc8021/attribution';

const GM_CONTRACT_ADDRESS = '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3';

export function useGMTransaction() {
  const { sendTransaction, isPending, isSuccess, error } = useSendTransaction();

  const sendGMTransaction = () => {
    const data = getAttributionPayload();
    sendTransaction({
      to: GM_CONTRACT_ADDRESS,
      value: parseEther('0'), // Sending 0 ETH, just data/trigger
      data: data as `0x${string}`, // attach ERC8021 payload if needed, or normal contract call
    });
  };

  return { sendGMTransaction, isPending, isSuccess, error };
}
