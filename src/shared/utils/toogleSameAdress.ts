import dayjs from 'dayjs';

interface IValidValue {
  value: string;
  isValid: boolean;
}

interface IFormContextType {
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
}

export default function toogleSameAdress(
  form: IFormContextType,
  isSameAdress: boolean
) {
  const formData = form;

  if (isSameAdress) {
    formData.shippingCode.value = ' ';
    formData.shippingCode.isValid = false;
    formData.shippingStreet.value = ' ';
    formData.shippingStreet.isValid = false;
    formData.shippingCity.value = ' ';
    formData.shippingCity.isValid = false;
    formData.shippingCountry.value = ' ';
    formData.shippingCountry.isValid = false;
  } else {
    formData.shippingCode.value = formData.billingCode.value;
    formData.shippingCode.isValid = true;
    formData.shippingStreet.value = formData.billingStreet.value;
    formData.shippingStreet.isValid = true;
    formData.shippingCity.value = formData.billingCity.value;
    formData.shippingCity.isValid = true;
    formData.shippingCountry.value = formData.billingCountry.value;
    formData.shippingCountry.isValid = true;
  }
}
