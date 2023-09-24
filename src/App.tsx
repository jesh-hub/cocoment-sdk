import MainPart from 'src/components/MainPart';
import { ProcessorProvider } from 'src/contexts/ProcessorContext';
import { SpinnerProvider } from 'src/contexts/SpinnerContext';
import { PageInfoProvider } from './contexts/PageInfoContext';

function App({ pageId }: { pageId: string }) {
  return (
    <PageInfoProvider pageId={pageId}>
      <ProcessorProvider>
        <SpinnerProvider>
          <MainPart />
        </SpinnerProvider>
      </ProcessorProvider>
    </PageInfoProvider>
  );
}

export default App;
