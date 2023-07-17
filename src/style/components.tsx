import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  variant?: 'clear';
}

export const Button = ({
  type,
  children,
  size = 'md',
  variant = 'clear',
  ...rest
}: ButtonProps) => {
  const SIZE = {
    sm: 'rounded-md px-2 py-1',
    md: '', // TODO
  }[size];
  const BORDER = {
    clear: 'border border-transparent',
  }[variant];
  const COLOR = {
    clear: 'bg-transparent text-slate-600 hover:text-slate-900',
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
