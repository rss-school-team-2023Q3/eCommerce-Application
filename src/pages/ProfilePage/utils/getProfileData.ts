import { Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import { IFormContextType } from 'pages/SignUpPage/formContext';

export default function getProfileData(user: Customer): IFormContextType {
  return {
    email: { value: user?.email ? user.email : '', isValid: false },
    password: { value: user?.password ? user.password : '', isValid: false },
    name: { value: user?.firstName ? user.firstName : '', isValid: false },
    lastName: { value: user?.lastName ? user.lastName : '', isValid: false },
    date: { value: dayjs(), isValid: false },
    // date: { value: user?.dateOfBirth ? user.dateOfBirth : '', isValid: false },
    billingStreet: { value: '', isValid: false },
    shippingStreet: { value: '', isValid: false },
    billingCity: { value: '', isValid: false },
    shippingCity: { value: '', isValid: false },
    billingCode: { value: '', isValid: false },
    shippingCode: { value: '', isValid: false },
    billingCountry: { value: '', isValid: false },
    shippingCountry: { value: '', isValid: false },
  };
}
