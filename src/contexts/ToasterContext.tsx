import { createContext } from 'react';
import type { ToasterFn } from 'types/toast';

export const ToasterContext = createContext<{
  warnToast: ToasterFn;
  errorToast: ToasterFn;
} | null>(null);
