import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  variant?: 'clear' | 'submit-outline';
}

export const Button = ({
  type,
  children,
  size = 'md',
  variant = 'clear',
  ...rest
}: ButtonProps) => {
  const SIZE = {
    sm: 'rounded-md px-2 py-1 text-xs',
    md: 'rounded-md px-2.5 py-1 text-sm',
  }[size];
  const BORDER = {
    clear: 'border border-transparent',
    'submit-outline': 'border border-slate-700/50 hover:border-slate-700/45',
  }[variant];
  const COLOR = {
    clear: 'bg-transparent text-slate-600 hover:text-slate-900',
    'submit-outline': 'bg-slate-600 text-slate-50 hover:bg-slate-600/90',
  }[variant];

  return (
    <button
      type={type || 'button'}
      className={`font-semibold hover:cursor-pointer ${SIZE} ${BORDER} ${COLOR}`}
      {...rest}
    >
      {children}
    </button>
  );
};
