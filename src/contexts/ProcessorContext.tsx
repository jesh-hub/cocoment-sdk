import React, { createContext, useEffect, useState } from 'react';
import { TriangleWarning } from 'src/components/SvgIcons';
import { FuncPromiseVoid } from 'src/types/Primitive';
import { warn } from 'src/utils/Log';

interface ProcessorContextProps {
  // 항상 resolve
  processAsync: (fn: FuncPromiseVoid) => Promise<void>;
  hideToast: () => void;
  showToast: (msg: string) => void;
}

const ProcessorContext = createContext<ProcessorContextProps>({
  processAsync: async () => warn("ProcessorProvider hasn't been loaded."),
  hideToast: () => warn("ProcessorProvider hasn't been loaded."),
  showToast: () => warn("ProcessorProvider hasn't been loaded."),
});

const ProcessorProvider = ({ children }: React.PropsWithChildren) => {
  const TransitionDuration = 300;

  const [toastMessage, setToastMessage] = useState('');
  const [isTransitionReady, setTransitionReady] = useState<boolean>(false);

  const hideToast = () => {
    // TODO 내려가고 있는데 새로운 ToastMessage가 들어온 경우
    setTransitionReady(false);
    setTimeout(() => setToastMessage(''), TransitionDuration); // 내려가는 Transition 후 message 초기화
  };

  const processAsync = async (fn: FuncPromiseVoid) => {
    try {
      await fn();
    } catch (err) {
      setToastMessage((err as Error).message || (err as string));
    }
  };

  useEffect(() => {
    if (toastMessage !== '') {
      setTransitionReady(true);
      const transitionTimeout = setTimeout(hideToast, 10 * TransitionDuration);

      return () => clearTimeout(transitionTimeout);
    }
  }, [toastMessage]);

  return (
    <ProcessorContext.Provider
      value={{
        processAsync,
        hideToast,
        showToast: setToastMessage,
      }}
    >
      {children}
      <div className="absolute inset-x-0 flex justify-center">
        {toastMessage && (
          <div
            className={`absolute -bottom-9 inline-flex h-9 items-center gap-1.5 rounded-3xl bg-red-500 px-5 text-slate-50 opacity-0 transition-all duration-${TransitionDuration} ${
              isTransitionReady && 'bottom-px opacity-100'
            }`}
          >
            <TriangleWarning />
            {toastMessage}
          </div>
        )}
      </div>
    </ProcessorContext.Provider>
  );
};

export { ProcessorContext, ProcessorProvider };
