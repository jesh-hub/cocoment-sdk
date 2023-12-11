import { useCallback, useMemo, useState } from 'react';
import { Bell, TriangleWarning } from 'src/components/SvgIcons';
import Toast from 'src/components/Toast';
import Transition from 'src/components/Transition';
import { ToasterContext } from 'src/contexts/ToasterContext';
import type { FC, PropsWithChildren } from 'react';
import type {
  ToastFloatingOptions,
  ToastItem,
  ToastType,
  ToasterFn,
} from 'types/toast';

const TOAST_TYPES: ToastType[] = ['warn', 'error'];

const ToasterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id?: number) => {
    if (id === undefined) return;
    setToasts((arr) => arr.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, options: ToastFloatingOptions) => {
      const id = new Date().getTime();
      setToasts((arr) => arr.concat({ id, type, message, options }));
      return () => hideToast(id);
    },
    [hideToast],
  );
  const [warnToast, errorToast] = useMemo<ToasterFn[]>(() => {
    return TOAST_TYPES.map((type) => {
      return (...args) => showToast(type, ...args);
    });
  }, [showToast]);

  const onReverseEnd = useCallback((id?: number) => hideToast(id), [hideToast]);

  return (
    <ToasterContext.Provider
      value={{
        warnToast,
        errorToast,
      }}
    >
      {children}
      {toasts.map(({ id, type, message, options }) => {
        const Icon = {
          warn: Bell,
          error: TriangleWarning,
        }[type];

        return (
          <Transition
            key={id}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            keep={1000}
            onReverseEnd={onReverseEnd}
            param={id}
          >
            <Toast variant={type} options={options}>
              <span className="mr-1.5">
                <Icon />
              </span>
              {message}
            </Toast>
          </Transition>
        );
      })}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
