type Priority = 'none' | 'low' | 'high';

export function calculateFocusPropFromPriorities(priorities: Priority[]) {
  // Count priorities
  const highCount = priorities.filter(p => p === 'high').length;
  const lowCount = priorities.filter(p => p === 'low').length;
  const noneCount = priorities.filter(p => p === 'none').length;
  const totalCount = priorities.length;

  // If all priorities are the same, handle special cases
  if (highCount === totalCount) {
    return { high: 1 / totalCount, low: 0, none: 0 };
  } 
  if (lowCount === totalCount) {
    return { high: 0, low: 1 / totalCount, none: 0 };
  }
  if (noneCount === totalCount) {
    return { high: 0, low: 0, none: 0 };
  }

  // Mixed priorities case - high gets 75%, low gets 25%, none gets 0%
  return {
    high: highCount > 0 ? 0.75 / highCount : 0,
    low: lowCount > 0 ? 0.25 / lowCount : 0,
    none: 0
  };
}
