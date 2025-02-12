let verbose = false;

export const logger = {
  setVerbose: (v: boolean) => {
    verbose = v;
  },
  
  log: (...args: any[]) => {
    if (verbose) {
      console.log(...args);
    }
  }
};
