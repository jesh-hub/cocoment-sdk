import { useCallback, useState } from 'react';
import useToaster from 'src/hooks/useToaster';
import { alwaysResolver } from 'src/utils/resolver';

type FuncAnon<T> = () => Promise<T | undefined>;
type FuncProcess = <T = void>(fn: FuncAnon<T>) => Promise<T | undefined>;

export default function useProcessor(
  initialProcessingCount = 0,
): [number, FuncProcess] {
  const { errorToast } = useToaster();
  const [processingCount, setProcessingCount] = useState<number>(
    initialProcessingCount,
  );

  const process: FuncProcess = useCallback(
    async (fn) => {
      setProcessingCount((count) => count + 1);
      const [res, err] = await alwaysResolver(fn);
      if (err !== undefined)
        errorToast(err.message, {
          reference: null, // TODO
        });
      setProcessingCount((count) => count - 1);
      return res;
    },
    [errorToast],
  );

  return [processingCount, process];
}
