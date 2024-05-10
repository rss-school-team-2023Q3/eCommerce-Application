import { BrowserRouter } from 'react-router-dom';
import { render, screen } from 'shared/utils/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.tsx';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });
  // it('should increment count on click', async () => {
  //   render(<App />);
  //   userEvent.click(screen.getByRole('button'));
  //   expect(await screen.findByText(/count is/i)).toBeInTheDocument();
  // });
});
