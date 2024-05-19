import AppWrapper from 'pages/App/AppReduxWrapper';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>,
);
