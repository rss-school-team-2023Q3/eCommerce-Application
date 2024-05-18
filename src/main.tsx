import App from 'pages/App/App';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
);
