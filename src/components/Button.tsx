import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  weight?: '' | 'semibold';
  variant?: 'clear' | 'primary' | 'secondary';
}

const Button = ({
  type,
  children,
  size = 'md',
  weight = '',
  variant = 'clear',
  ...rest
}: ButtonProps) => {
  const SIZE = {
    sm: 'rounded-md px-2 py-1 text-xs',
    md: 'rounded-md px-3 py-[0.3125rem] text-sm',
  }[size];
  const BORDER = {
    clear: '',
    primary: 'shadow-sm',
    secondary:
      'shadow-sm shadow-black/5 ring-1 ring-inset ring-gray-300 ring-offset-0',
  }[variant];
  const COLOR = {
    clear:
      'bg-transparent text-slate-600 hover:text-slate-900 disabled:text-slate-400',
    primary:
      'bg-slate-600 text-slate-50 hover:bg-slate-600/90 disabled:bg-slate-500',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 disabled:bg-gray-100',
  }[variant];

  return (
    <button
      type={type || 'button'}
      className={`hover:cursor-pointer ${
        weight && `font-${weight}`
      } ${SIZE} ${BORDER} ${COLOR}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
