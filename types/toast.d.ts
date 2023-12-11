export type ToastType = 'warn' | 'error';
export type ToastPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type ToastFloatingOptions = {
  reference: HTMLElement | null; // target
  placement?: ToastPlacement;
};

export type ToastItem = {
  id: number; // new Date.getTime()
  message: string;
  type: ToastType;
  options: ToastFloatingOptions;
};

export type ToasterFn = (msg: string, opts: ToastFloatingOptions) => void;
