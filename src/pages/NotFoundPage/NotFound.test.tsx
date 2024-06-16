import { BrowserRouter } from 'react-router-dom';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import NotFound from './NotFound.tsx';

describe('Simple working test', () => {
  it('the label is visible', () => {
    render(
      <BrowserRouter basename="/">
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
  it('the label is visible', () => {
    render(
      <BrowserRouter basename="/">
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText('Return Home')).toBeInTheDocument();
  });
});
