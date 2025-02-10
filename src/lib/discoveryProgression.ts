import { cn } from "@/lib/utils";

export type DiscoveryStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

export interface DiscoveryThresholds {
  thoughtToImagine: number;
  thoughtToDiscover: number;
}

export interface DiscoveryResult {
  newStatus: DiscoveryStatus;
  newThoughtInvested: number;
}

/**
 * Given a current discovery status and the amount of thought invested,
 * check against thresholds and return the updated status and thinking remainder.
 * The rules are:
 *  - If status is 'unthoughtof' and total invested >= thoughtToImagine, change status to 'imagined'.
 *  - If status is 'imagined' and total invested >= thoughtToDiscover, change status to 'discovered'.
 *  - Otherwise, keep the same status and update the invested thought.
 */
export function progressDiscovery(
  currentStatus: DiscoveryStatus,
  currentThoughtInvested: number,
  thoughtIncrement: number,
  thresholds: DiscoveryThresholds
): DiscoveryResult {
  const total = currentThoughtInvested + thoughtIncrement;

  if (currentStatus === 'unthoughtof' && total >= thresholds.thoughtToImagine) {
    return { newStatus: 'imagined', newThoughtInvested: 0 };
  } else if (currentStatus === 'imagined' && total >= thresholds.thoughtToDiscover) {
    return { newStatus: 'discovered', newThoughtInvested: 0 };
  }
  return { newStatus: currentStatus, newThoughtInvested: total };
}
