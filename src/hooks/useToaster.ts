import { useContext } from 'react';
import { ToasterContext } from 'src/contexts/ToasterContext';

export default function useToaster() {
  const value = useContext(ToasterContext);

  if (value === null) throw Error('Context has not been provided.');
  return value;
}
