import { Spinner } from 'src/components/SvgIcons.tsx';
import type { FC, PropsWithChildren, ReactNode } from 'react';

type ConditionalSpinnerProps = PropsWithChildren<{
  processingCount: number;
  spinnerOuter?: (children: ReactNode) => ReactNode;
}>;

const ConditionalSpinner: FC<ConditionalSpinnerProps> = ({
  processingCount,
  spinnerOuter,
  children,
}) => {
  const spinner =
    spinnerOuter !== undefined ? spinnerOuter(<Spinner />) : <Spinner />;
  return (
    <>
      {processingCount > 0 && spinner}
      {processingCount === 0 && children}
    </>
  );
};

export default ConditionalSpinner;
