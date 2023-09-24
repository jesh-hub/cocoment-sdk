import { createContext } from 'react';

interface PageInfoContextProps {
  pageId: string;
}

const PageInfoContext = createContext<PageInfoContextProps>({
  pageId: '',
});

const PageInfoProvider = ({
  pageId,
  children,
}: React.PropsWithChildren<{ pageId?: string }>) => {
  const { host, pathname } = window.location;

  return (
    <PageInfoContext.Provider
      value={{
        pageId: pageId || host + pathname,
      }}
    >
      {children}
    </PageInfoContext.Provider>
  );
};

export { PageInfoContext, PageInfoProvider };
