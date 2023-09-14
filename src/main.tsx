import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App.tsx';
import { error } from 'src/utils/Log';

import 'src/index.css';

const RootElementId = 'cocoment-root';
const $root = document.getElementById(RootElementId);

if ($root === null) error(`cannot find root element: ${RootElementId}`);
else {
  $root.classList.add('relative');
  ReactDOM.createRoot($root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
