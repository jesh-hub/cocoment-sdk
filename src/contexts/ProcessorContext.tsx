import React, { createContext, useEffect, useState } from 'react';
import { Bell, TriangleWarning } from 'src/components/SvgIcons';
import { FuncPromiseVoid } from 'src/types/Primitive';
import { warn } from 'src/utils/Log';

interface ProcessorContextProps {
  // 항상 resolve
  processAsync: (fn: FuncPromiseVoid) => Promise<void>;
  hide: () => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
}

const ProcessorContext = createContext<ProcessorContextProps>({
  processAsync: async () => warn("ProcessorProvider hasn't been loaded."),
  hide: () => warn("ProcessorProvider hasn't been loaded."),
  warn: () => warn("ProcessorProvider hasn't been loaded."),
  error: () => warn("ProcessorProvider hasn't been loaded."),
});

const Theme = {
  warn: 'bg-amber-300 text-slate-900',
  error: 'bg-red-500 text-slate-50',
};
const TransitionDuration = 300;

const ProcessorProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<(typeof Theme)[keyof typeof Theme]>();
  const [Icon, setIcon] = useState<React.ReactNode>();
  const [toastMessage, setToastMessage] = useState('');
  const [isTransitionReady, setTransitionReady] = useState<boolean>(false);

  const hide = () => {
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
      const transitionTimeout = setTimeout(hide, 10 * TransitionDuration);

      return () => clearTimeout(transitionTimeout);
    }
  }, [toastMessage]);

  return (
    <ProcessorContext.Provider
      value={{
        processAsync,
        hide,
        warn: (message: string) => {
          setIcon(Bell);
          setTheme(Theme.warn);
          setToastMessage(message);
        },
        error: (message: string) => {
          setIcon(TriangleWarning);
          setTheme(Theme.error);
          setToastMessage(message);
        },
      }}
    >
      {children}
      <div className="absolute inset-x-0 flex justify-center">
        {toastMessage && (
          <div
            className={`absolute -bottom-9 inline-flex h-9 items-center gap-1.5 rounded-3xl px-5 opacity-0 transition-all duration-${TransitionDuration} ${theme} ${
              isTransitionReady && 'bottom-px opacity-100'
            }`}
          >
            {Icon}
            {toastMessage}
          </div>
        )}
      </div>
    </ProcessorContext.Provider>
  );
};

export { ProcessorContext, ProcessorProvider };
