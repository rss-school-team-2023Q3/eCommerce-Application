import dayjs from 'dayjs';
import { createContext } from 'react';

const formContext = createContext({
  email: '',
  password: '',
  name: '',
  lastName: '',
  date: dayjs(),
  street: '',
  city: '',
  code: '',
  country: '',
  isValid: '',
});

export default formContext;
