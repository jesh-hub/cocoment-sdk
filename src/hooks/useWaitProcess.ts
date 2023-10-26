import { useState } from 'react';
import useToast from 'src/hooks/useToast';
import type { FuncPromiseVoid } from 'types/common';

export default function useWaitProcess() {
  const { processAsync } = useToast();
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const waitProcessAsync = async (fn: FuncPromiseVoid) => {
    setWaitingCount((count) => count + 1);
    await processAsync(fn);
    setWaitingCount((count) => count - 1);
  };

  return {
    waitingCount,
    waitProcessAsync,
  };
}
