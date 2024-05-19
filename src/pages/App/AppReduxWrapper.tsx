import App from 'pages/App/App';
import { Provider } from 'react-redux';
import store from 'shared/api/authApi/store/store';

function AppReduxWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppReduxWrapper;
