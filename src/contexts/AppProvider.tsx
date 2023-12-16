import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { PageIdContext, UserContext } from 'src/contexts/AppContext.tsx';
import { subscribeAuthState } from 'src/services/firebase';
import type { PropsWithChildren } from 'react';

type AppProviderProps = PropsWithChildren<{
  pageId: string;
}>;

const AppProvider = ({ pageId, children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // firebase의 unsubscribe 함수를 리턴한다.
    return subscribeAuthState((user) => {
      setUser(user);
    });
  }, []);

  return (
    <PageIdContext.Provider value={pageId}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </PageIdContext.Provider>
  );
};

export default AppProvider;
