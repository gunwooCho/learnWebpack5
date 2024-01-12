import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import moment from 'moment';

import App from 'components/App';

import 'util/worker';

import store from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <>{moment().toString()}</>
      <App />
    </Provider>
  </React.StrictMode>,
);
