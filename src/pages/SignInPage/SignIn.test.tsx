import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'shared/api/store.ts';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import SignIn from './SignIn.tsx';

describe('Simple working test', () => {
  it('the label is visible', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  it('the label is visible', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
