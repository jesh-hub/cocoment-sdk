import React, { useEffect, useState } from 'react';

type TransitionProps = {
  role?: string;
  style?: React.CSSProperties;
  className?: string;
  from: React.CSSProperties;
  to: React.CSSProperties;
  delay?: number;
  ease?: 'linear' | 'in' | 'out' | 'in-out';
  duration?: number;
  reverseDelay?: number;
  onReverse?: () => void;
};

const TransitionDuration = 300;

const Transition = ({
  children,
  role,
  className = '',
  from = { opacity: 0 },
  to = { opacity: 1 },
  delay = 0,
  ease = 'in-out',
  duration = TransitionDuration,
  reverseDelay,
  onReverse,
  ...props
}: React.PropsWithChildren<TransitionProps>) => {
  const [isTransitionReady, setTransitionReady] = useState<boolean>(false);

  const style: React.CSSProperties =
    props.style !== undefined ? { ...props.style, ...from } : { ...from };
  const properties = [];
  for (const key in to) properties.push(key);
  style.transitionProperty = properties.join(', ');

  const reverse = () => {
    if (reverseDelay !== undefined)
      setTimeout(() => {
        setTransitionReady(false);
        if (onReverse !== undefined) setTimeout(onReverse, duration);
      }, duration + reverseDelay);
  };

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setTransitionReady(true);
      if (reverseDelay !== undefined) reverse();
    }, delay);
    return () => clearTimeout(delayTimeout);
  }, []);

  return (
    <div
      role={role}
      style={isTransitionReady ? { ...style, ...to } : style}
      className={`${className} duration-${duration} ease-${ease}`}
    >
      {children}
    </div>
  );
};

export default Transition;
