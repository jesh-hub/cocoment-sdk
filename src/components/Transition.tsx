import React, { useEffect, useState } from 'react';

type TransitionProps = {
  role?: string;
  className?: string;
  from: React.CSSProperties;
  to: React.CSSProperties;
  delay?: number;
  ease?: 'linear' | 'in' | 'out' | 'in-out';
  duration?: number;
  keep?: number;
  onReverseEnd?: (param: number) => void;
  param: number;
};

const Transition = ({
  children,
  role,
  from = { opacity: 0 },
  to = { opacity: 1 },
  delay = 0,
  ease = 'in-out',
  duration = 300,
  keep,
  onReverseEnd, // 주의: useCallback으로 Object.is 비교 true가 나오게 할 것
  param, // onReverseEnd 인자로 전달할 값. 객체일 때 주의할 것
}: React.PropsWithChildren<TransitionProps>) => {
  const [isTransitionReady, setTransitionReady] = useState<boolean>(false);
  const transitionProperty = isTransitionReady
    ? Object.keys(to).join(', ')
    : undefined;

  useEffect(() => {
    let reverseTimeoutId: NodeJS.Timeout;
    let reverseDelayTimeoutId: NodeJS.Timeout;
    const reverse = () => {
      if (keep === undefined) return;

      reverseTimeoutId = setTimeout(() => {
        setTransitionReady(false);
        if (onReverseEnd !== undefined)
          reverseDelayTimeoutId = setTimeout(() => {
            onReverseEnd(param);
          }, duration);
      }, duration + keep); // wait for reverse
    };

    const delayTimeoutId = setTimeout(() => {
      setTransitionReady(true);
      reverse();
    }, delay);
    return () => {
      clearTimeout(delayTimeoutId);
      if (reverseTimeoutId !== undefined) clearTimeout(reverseTimeoutId);
      if (reverseDelayTimeoutId !== undefined)
        clearTimeout(reverseDelayTimeoutId);
    };
  }, [delay, keep, duration, onReverseEnd, param]);

  return (
    <div
      role={role}
      style={isTransitionReady ? { ...to, transitionProperty } : from}
      className={`duration-${duration} ease-${ease}`}
    >
      {children}
    </div>
  );
};

export default Transition;
