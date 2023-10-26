import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App.tsx';
import { error } from 'src/utils/log';

import 'src/index.css';

const RootElementId = 'cocoment-root';
const $root = document.getElementById(RootElementId);
const pageId = $root?.dataset.pageid || undefined;

if ($root === null) error(`cannot find root element: ${RootElementId}`);
else if (pageId === undefined)
  error(`cannot find attribute of root element: data-pageid`);
else {
  $root.classList.add('relative');
  ReactDOM.createRoot($root).render(
    <React.StrictMode>
      <App pageId={pageId} />
    </React.StrictMode>,
  );
}
