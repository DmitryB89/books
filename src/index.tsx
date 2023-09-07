import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {Provider} from 'react-redux';
import store from './store/store';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallback} >
      <App/>
    </ErrorBoundary>,
  </Provider>,
);

