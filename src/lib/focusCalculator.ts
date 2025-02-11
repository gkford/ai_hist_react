type Priority = 'none' | 'low' | 'high';

export function calculateFocusPropFromPriorities(priorities: Priority[]) {
  // Count priorities
  const highCount = priorities.filter(p => p === 'high').length;
  const lowCount = priorities.filter(p => p === 'low').length;
  const noneCount = priorities.filter(p => p === 'none').length;

  console.log('Focus Calculator Counts:', { highCount, lowCount, noneCount });

  // If everything is set to none, they share 100%
  if (noneCount === priorities.length && noneCount > 0) {
    console.log('Rule: All none - sharing 100%');
    return {
      high: 0,
      low: 0,
      none: 1 / noneCount
    };
  }

  // If there are high priority items, they share 100% if no low priority items exist
  if (highCount > 0 && lowCount === 0) {
    console.log('Rule: High priority items sharing 100%');
    return {
      high: 1 / highCount,
      low: 0,
      none: 0
    };
  }
  
  // If there are low priority items but no high priority items, they share 100%
  if (lowCount > 0 && highCount === 0) {
    console.log('Rule: Low priority items sharing 100%');
    return {
      high: 0,
      low: 1 / lowCount,
      none: 0
    };
  }
  
  // If both high and low exist, high shares 75%, low shares 25%
  if (highCount > 0 && lowCount > 0) {
    console.log('Rule: High (75%) and Low (25%) sharing');
    return {
      high: 0.75 / highCount,
      low: 0.25 / lowCount,
      none: 0
    };
  }

  // If no priorities exist at all, everything gets 0
  console.log('Rule: No priorities - all zero');
  return {
    high: 0,
    low: 0,
    none: 0
  };
}
