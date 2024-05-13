import { BrowserRouter } from 'react-router-dom';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import SignUp from './SignUp.tsx';

describe('Simple working test', () => {
  it('the link is visible', () => {
    render(
      <BrowserRouter basename="/">
        <SignUp />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Already have an account? Sign In'),
    ).toBeInTheDocument();
  });
  it('the input is visible', () => {
    render(
      <BrowserRouter basename="/">
        <SignUp />
      </BrowserRouter>,
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
