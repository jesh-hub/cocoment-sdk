import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App.tsx';
import { error } from 'src/util/Log.ts';

import 'src/index.css';

const RootElementId = 'cocoment-root';
const $root = document.getElementById(RootElementId);

if ($root === null) error(`cannot find root element: ${RootElementId}`);
else
  ReactDOM.createRoot($root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
