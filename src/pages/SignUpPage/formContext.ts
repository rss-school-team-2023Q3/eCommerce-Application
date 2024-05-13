import dayjs from 'dayjs';
import { createContext } from 'react';

const formContext = createContext({
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  name: { value: '', isValid: false },
  lastName: { value: '', isValid: false },
  date: { value: dayjs(), isValid: false },
  street: { value: '', isValid: false },
  city: { value: '', isValid: false },
  billingCode: { value: '', isValid: false },
  shippingCode: { value: '', isValid: false },
  billingCountry: { value: '', isValid: false },
  shippingCountry: { value: '', isValid: false },
});

export default formContext;
