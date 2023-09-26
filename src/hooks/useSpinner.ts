import { useContext } from 'react';
import { SpinnerContext } from 'src/contexts/SpinnerContext';

export default function useSpinner() {
  return useContext(SpinnerContext);
}
