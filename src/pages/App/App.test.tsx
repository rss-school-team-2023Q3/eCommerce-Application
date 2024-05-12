import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.tsx';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });
  it('should increment count on click', () => {
    render(<App />);
    expect(screen.getByText(/count is/i)).toBeInTheDocument();
  });
});
