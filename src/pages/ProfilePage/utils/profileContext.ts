import dayjs from 'dayjs';
import { IFormContextType } from 'pages/SignUpPage/formContext';
import { Context, createContext } from 'react';

export const initialContextProfile: IFormContextType = {
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  name: { value: '', isValid: false },
  lastName: { value: '', isValid: false },
  date: { value: dayjs(''), isValid: false },
  billingStreet: { value: '', isValid: false },
  shippingStreet: { value: '', isValid: false },
  billingCity: { value: '', isValid: false },
  shippingCity: { value: '', isValid: false },
  billingCode: { value: '', isValid: false },
  shippingCode: { value: '', isValid: false },
  billingCountry: { value: '', isValid: false },
  shippingCountry: { value: '', isValid: false },
  fieldChangedSet: new Set<string>(),
};

const profileContext: Context<IFormContextType> = createContext(
  initialContextProfile,
);

export default profileContext;
