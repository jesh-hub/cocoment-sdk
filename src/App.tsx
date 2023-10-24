import MainPart from 'src/components/MainPart';
import { AppProvider } from 'src/contexts/AppContext';
import { ProcessorProvider } from 'src/contexts/ProcessorContext';

function App({ pageId }: { pageId: string }) {
  return (
    <AppProvider pageId={pageId}>
      <ProcessorProvider>
        <MainPart />
      </ProcessorProvider>
    </AppProvider>
  );
}

export default App;
