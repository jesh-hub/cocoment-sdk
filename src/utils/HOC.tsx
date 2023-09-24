import React from 'react';
import { SpinnerProvider } from 'src/contexts/SpinnerContext';

export const withSpinner = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P) => {
    return (
      <SpinnerProvider>
        <WrappedComponent {...props} />
      </SpinnerProvider>
    );
  };
};
