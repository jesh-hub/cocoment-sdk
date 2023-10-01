import MainPart from 'src/components/MainPart';
import { ProcessorProvider } from 'src/contexts/ProcessorContext';
import { PageInfoProvider } from './contexts/PageInfoContext';

function App({ pageId }: { pageId: string }) {
  return (
    <PageInfoProvider pageId={pageId}>
      <ProcessorProvider>
        <MainPart />
      </ProcessorProvider>
    </PageInfoProvider>
  );
}

export default App;
