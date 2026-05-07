import { encodePacked, toHex, keccak256 } from 'viem';

/**
 * Utility for ERC-8021 Transaction Attribution.
 * Attaches a Builder Code and an Attribution Code to transactions.
 */
export const BUILDER_CODE = 'bc_w5vtza16';
export const GAME_ATTRIBUTION_CODE = 'ABYSSAL_INK_RUNNER';

export function getAttributionPayload(customAttribution?: string) {
  const attribution = customAttribution || GAME_ATTRIBUTION_CODE;
  // According to standard, typically appended as calldata or emitted in specific events.
  // This is a simplified hex representation for general payload inclusion.
  return toHex(`ERC8021:${BUILDER_CODE}:${attribution}`);
}
