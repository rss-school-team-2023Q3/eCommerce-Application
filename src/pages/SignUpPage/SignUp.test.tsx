import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'shared/api/store.ts';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder.ts';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import SignUp from './SignUp.tsx';

describe('Simple working test', () => {
  const client = new ApiBuilder();

  it('the link is visible', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SignUp client={client} />
        </BrowserRouter>
      </Provider>,
    );
    expect(
      screen.getByText('Already have an account? Sign In'),
    ).toBeInTheDocument();
  });
  it('the input is visible', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SignUp client={client} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
