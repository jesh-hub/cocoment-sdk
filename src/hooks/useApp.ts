import { useContext } from 'react';
import { PageIdContext, UserContext } from 'src/contexts/AppContext.tsx';

export function usePageId() {
  const value = useContext(PageIdContext);

  if (value === null) throw Error('Context page id has not been provided.');
  return value;
}

export function useUser() {
  return useContext(UserContext);
}
