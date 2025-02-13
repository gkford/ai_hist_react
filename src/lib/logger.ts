let verbose = false;

export const logger = {
  setVerbose: (v: boolean) => {
    verbose = v;
  },
  
  isVerbose: () => verbose,
  
  log: (...args: any[]) => {
    if (verbose) {
      console.log(...args);
    }
  }
};
