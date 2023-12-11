import MainPart from 'src/components/MainPart';
import { AppProvider } from 'src/contexts/AppContext';
import ToasterProvider from 'src/contexts/ToasterProvider';

function App({ pageId }: { pageId: string }) {
  return (
    <AppProvider pageId={pageId}>
      <ToasterProvider>
        <MainPart />
      </ToasterProvider>
    </AppProvider>
  );
}

export default App;
