import { useContext } from 'react';
import { ProcessorContext } from 'src/contexts/ProcessorContext';

export default function useToast() {
  return useContext(ProcessorContext);
}
