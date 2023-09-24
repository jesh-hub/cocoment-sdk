import React, { createContext, useContext, useState } from 'react';
import { Spinner } from 'src/components/SvgIcons';
import { ProcessorContext } from 'src/contexts/ProcessorContext';
import { FuncPromiseVoid } from 'src/types/Primitive';
import { warn } from 'src/utils/Log';

interface SpinnerContextProps {
  // 항상 resolve
  waitProcessAsync: (fn: FuncPromiseVoid) => Promise<void>;
}

// withSpinner로 감싼 컴포넌트의 영역에 spinner를 그린다.
const SpinnerContext = createContext<SpinnerContextProps>({
  waitProcessAsync: async () => warn("SpinnerProvider hasn't been loaded."),
});

const SpinnerProvider = ({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) => {
  const { processAsync } = useContext(ProcessorContext);
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const waitProcessAsync = async (fn: FuncPromiseVoid) => {
    setWaitingCount((count) => count + 1);
    await processAsync(fn);
    setWaitingCount((count) => count - 1);
  };

  return (
    <SpinnerContext.Provider
      value={{
        waitProcessAsync,
      }}
    >
      <div className="relative">
        {children}
        {waitingCount > 0 && (
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center bg-gray-200/20 ${className}`}
          >
            <Spinner />
          </div>
        )}
      </div>
    </SpinnerContext.Provider>
  );
};

export { SpinnerContext, SpinnerProvider };
