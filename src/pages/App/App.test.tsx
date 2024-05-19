import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'shared/api/authApi/store/store.ts';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.tsx';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });
  // it('should increment count on click', async () => {
  //   render(<App />);
  //   userEvent.click(screen.getByRole('button'));
  //   expect(await screen.findByText(/count is/i)).toBeInTheDocument();
  // });
});
