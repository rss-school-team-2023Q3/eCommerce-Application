import AppWrapper from 'pages/App/AppReduxWrapper';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <AppWrapper />
  </BrowserRouter>,
);
