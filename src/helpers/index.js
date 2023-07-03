// DEV only to simulate slow connection without throttling bandwidth.
export const devPause = duration => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
