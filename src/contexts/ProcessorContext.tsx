import React, { createContext, useState } from 'react';
import { Bell, TriangleWarning } from 'src/components/SvgIcons';
import Toast from 'src/components/Toast';
import { warn } from 'src/utils/log';
import type { FuncPromiseVoid } from 'types/common';
import type { ToastPlacement } from 'types/toast';

interface ProcessorContextProps {
  // 항상 resolve
  processAsync: (fn: FuncPromiseVoid) => Promise<void>;
  hideToast: () => void;
  warnToast: (msg: string, target?: EventTarget, loc?: ToastPlacement) => void;
  errorToast: (msg: string, target?: EventTarget, loc?: ToastPlacement) => void;
}

const ProcessorContext = createContext<ProcessorContextProps>({
  processAsync: async () => warn("ProcessorProvider hasn't been loaded."),
  hideToast: () => warn("ProcessorProvider hasn't been loaded."),
  warnToast: () => warn("ProcessorProvider hasn't been loaded."),
  errorToast: () => warn("ProcessorProvider hasn't been loaded."),
});

const ProcessorProvider = ({ children }: React.PropsWithChildren) => {
  const [messages, setMessages] = useState<
    {
      id: number; // new Date.getTime()
      HeadIcon?: () => JSX.Element;
      type: 'warn' | 'error';
      message: string;
      target?: EventTarget;
      placement?: ToastPlacement;
    }[]
  >([]);

  const showToast = (
    type: 'warn' | 'error',
    message: string,
    options?: {
      icon?: () => JSX.Element;
      target?: EventTarget;
      placement?: ToastPlacement;
    },
  ) => {
    const id = new Date().getTime();

    setMessages((arr) => {
      return arr.concat({
        id,
        HeadIcon: options?.icon,
        type,
        message,
        target: options?.target,
        placement: options?.placement,
      });
    });
    return id;
  };

  const hideToast = (id?: number) => {
    if (id === undefined) setMessages([]);
    else setMessages((arr) => arr.filter((msg) => msg.id !== id));
  };

  const processAsync = async (fn: FuncPromiseVoid) => {
    try {
      await fn();
    } catch (err) {
      showToast('error', (err as Error).message || (err as string));
    }
  };

  return (
    <ProcessorContext.Provider
      value={{
        processAsync,
        hideToast,
        warnToast: (msg, target, placement) =>
          showToast('warn', msg, {
            icon: Bell,
            target,
            placement: target !== undefined ? placement || 'r' : undefined,
          }),
        errorToast: (msg, target, placement) =>
          showToast('error', msg, {
            icon: TriangleWarning,
            target,
            placement: target !== undefined ? placement || 'r' : undefined,
          }),
      }}
    >
      {children}
      {messages.map(({ id, type, target, placement, message, HeadIcon }) => (
        <Toast
          key={id}
          variant={type}
          target={target as HTMLElement}
          placement={placement}
          className="inline-flex items-center gap-1.5"
          close={() => hideToast(id)}
        >
          {HeadIcon !== undefined && <HeadIcon />}
          {message}
        </Toast>
      ))}
    </ProcessorContext.Provider>
  );
};

export { ProcessorContext, ProcessorProvider };
