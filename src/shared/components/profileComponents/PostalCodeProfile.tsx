import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { postcodeValidator } from 'postcode-validator';
import { useContext, useEffect, useState } from 'react';
import selectCountryCode from 'shared/utils/selectCountryCode';

type TypePostal = 'billingCode' | 'shippingCode';

interface IPostalPropsInterface {
  postalProps: { type: string; isChange: boolean; profilePostalCode?: string };
}

function PostalCodeInput({ postalProps }: IPostalPropsInterface) {
  const formData = useContext(profileContext);
  const [isValid, setIsValid] = useState(true);
  const typePostal: TypePostal = `${postalProps.type}Code` as TypePostal;

  formData[typePostal].value = postalProps.profilePostalCode as TypePostal;

  const [postalProfile, setPostalProfile] = useState(
    formData[typePostal].value,
  );
  const country = postalProps.type === 'shipping'
    ? formData.shippingCountry.value
    : formData.billingCountry.value;

  function setPostalPropsContext(
    value: string,
    countryCode: string,
    type: string,
  ) {
    if (postcodeValidator(value, countryCode) && type === 'shipping') {
      formData.shippingCode.value = value;
      formData.shippingCode.isValid = true;
    } else if (postcodeValidator(value, countryCode) && type === 'billing') {
      formData.billingCode.value = value;
      formData.billingCode.isValid = true;
    } else if (!postcodeValidator(value, countryCode) && type === 'billing') {
      formData.billingCode.isValid = false;
    } else if (!postcodeValidator(value, countryCode) && type === 'shipping') {
      formData.shippingCode.isValid = false;
    }
  }

  function checkCode(value: string) {
    setPostalProfile(value);
    formData[typePostal].value = value;

    if (typeof country === 'string' && country.length > 1) {
      const countryCode = selectCountryCode(country);

      setIsValid(postcodeValidator(value, countryCode));
      setPostalPropsContext(value, countryCode, postalProps.type);
    }
  }

  useEffect(() => {
    checkCode(postalProfile);
  }, [postalProps.isChange]);

  return (
    <TextField
      value={postalProfile}
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      required
      size="small"
      onChange={(e) => checkCode(e.target.value)}
      label={postalProps.profilePostalCode ? '' : 'Postal Code'}
      helperText={isValid ? '' : 'Enter valid postal code'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default PostalCodeInput;
