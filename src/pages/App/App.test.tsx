import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen, userEvent } from '../../shared/utils/test-utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });
  it('should increment count on click', async () => {
    render(<App />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/count is/i)).toBeInTheDocument();
  });
});
