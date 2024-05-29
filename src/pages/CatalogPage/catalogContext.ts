import { createContext } from 'react';

const catalogContext = createContext({
  manuufacture: '',
  priceMin: '',
  priceMax: '',
  isLoading: false,
});

export default catalogContext;
