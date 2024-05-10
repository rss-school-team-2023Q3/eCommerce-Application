import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import SignIn from './SignIn.tsx';

describe('Simple working test', () => {
  it('the label is visible', () => {
    render(<SignIn />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  it('the label is visible', () => {
    render(<SignIn />);
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
