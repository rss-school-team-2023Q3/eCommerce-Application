import dayjs from 'dayjs';
import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress';
import { Context, createContext } from 'react';

export interface IValidValue {
  value: string;
  isValid: boolean;
}

export interface IFormContextType {
  email: IValidValue;
  password: IValidValue;
  name: IValidValue;
  lastName: IValidValue;
  date: { value: dayjs.Dayjs; isValid: boolean };
  billingStreet: IValidValue;
  shippingStreet: IValidValue;
  shippingCity: IValidValue;
  billingCity: IValidValue;
  billingCode: IValidValue;
  shippingCode: IValidValue;
  billingCountry: IValidValue;
  shippingCountry: IValidValue;
  fieldChangedSet?: Set<string>;
  fieldChangedSetAddr?: Set<string>;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  oldPassword?: string;
  addresses?: IMapAddresses[];
}

export const initialContext: IFormContextType = {
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
};

const formContext: Context<IFormContextType> = createContext(
  structuredClone(initialContext)
);

export default formContext;
