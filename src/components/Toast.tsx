import Transition from 'src/components/Transition';
import type { ToastPlacement } from 'types/toast';

const Body = {
  warn: 'bg-amber-300 text-slate-900',
  error: 'bg-red-500 text-slate-50',
};

type ToastProps = {
  variant: 'warn' | 'error';
  target?: HTMLElement;
  placement?: ToastPlacement; // target 기준 left, right
  duration?: number;
  className?: string;
  close: () => void;
};

const Toast = ({
  variant,
  target,
  placement,
  duration = 1000,
  className = '',
  children,
  close,
}: React.PropsWithChildren<ToastProps>) => {
  let x: number | string = 0;
  let y: number = 5; // 적당한 여백

  if (target !== undefined) {
    switch (placement) {
      case 'r':
        x = `${target.offsetLeft + target.clientWidth / 2}px`;
        break;
      case 'l':
        x = `calc(${target.offsetLeft + target.clientWidth / 2}px - 100%)`;
        break;
    }
    y += target.offsetTop + target.clientHeight;
  }

  return (
    <Transition
      role="alert"
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      reverseDelay={duration}
      onReverse={close}
      style={{
        transform: `translate3d(${x}, ${y}px, 0)`,
      }}
      className={`absolute top-0 ${x !== 0 && 'left-0'} ${
        x === 0 && 'inset-x-0 text-center'
      }`}
    >
      <div className={`${className} h-9 rounded-3xl px-5 ${Body[variant]}`}>
        {children}
      </div>
    </Transition>
  );
};

export default Toast;
