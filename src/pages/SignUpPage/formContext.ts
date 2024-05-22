import dayjs from 'dayjs';
import { createContext } from 'react';

const formContext = createContext({
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  name: { value: '', isValid: false },
  lastName: { value: '', isValid: false },
  date: { value: dayjs(), isValid: false },
  billingStreet: { value: '', isValid: false },
  shippingStreet: { value: '', isValid: false },
  billingCity: { value: '', isValid: false },
  shippingCity: { value: '', isValid: false },
  billingCode: { value: '', isValid: false },
  shippingCode: { value: '', isValid: false },
  billingCountry: { value: '', isValid: false },
  shippingCountry: { value: '', isValid: false },
});

export default formContext;
