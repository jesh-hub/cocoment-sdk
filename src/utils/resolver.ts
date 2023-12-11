export const alwaysResolver = async <T = undefined>(
  fn: () => Promise<T>,
): Promise<[T | undefined, Error | undefined]> => {
  let result, error;

  try {
    result = await fn();
  } catch (err) {
    error = err as Error;
  }

  return [result, error];
};
