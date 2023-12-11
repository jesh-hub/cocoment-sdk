import { offset, useFloating } from '@floating-ui/react';
import type { FC, PropsWithChildren } from 'react';
import type { ToastFloatingOptions } from 'types/toast';

const Body = {
  warn: 'bg-amber-300 text-slate-900',
  error: 'bg-red-500 text-slate-50',
};

type ToastProps = PropsWithChildren<{
  variant: 'warn' | 'error';
  options: ToastFloatingOptions;
}>;

const Toast: FC<ToastProps> = ({ variant, options, children }) => {
  const { floatingStyles, refs } = useFloating({
    placement: options.placement,
    middleware: [
      offset({
        mainAxis: 5,
      }),
    ],
    elements: options && {
      reference: options.reference,
    },
  });

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={`inline-flex h-9 items-center rounded-3xl px-5 ${Body[variant]}`}
    >
      {children}
    </div>
  );
};

export default Toast;
