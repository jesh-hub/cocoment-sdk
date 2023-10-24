import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { subscribeAuthState } from 'src/services/firebase';

interface AppContextProps {
  pageId: string;
  user: User | null | undefined;
}

const AppContext = createContext<AppContextProps>({
  pageId: '',
  user: undefined,
});

const AppProvider = ({
  pageId,
  children,
}: React.PropsWithChildren<{ pageId: string }>) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = subscribeAuthState({
      login: setUser,
      logout: () => setUser(null),
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        pageId,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
