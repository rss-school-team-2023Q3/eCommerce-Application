import App from 'pages/App/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
