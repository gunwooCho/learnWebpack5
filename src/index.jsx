import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const worker = new Worker(new URL('./util/workerExample.js', import.meta.url));
console.log(import.meta.url);

worker.postMessage({
  question:
    'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
});

worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
