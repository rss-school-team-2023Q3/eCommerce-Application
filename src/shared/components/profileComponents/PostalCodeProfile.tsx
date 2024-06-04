import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { postcodeValidator } from 'postcode-validator';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import selectCountryCode from 'shared/utils/selectCountryCode';

// type TypePostal = 'billingCode' | 'shippingCode';

interface IPostalPropsInterface {
  postalProps: {
    type: string;
    isChange: boolean;
    profilePostalCode?: string;
    isDisable: boolean;
    addressId: string;
  };
}

function PostalCodeInput({ postalProps }: IPostalPropsInterface) {
  const formData = useContext(profileContext);
  const [isValid, setIsValid] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const userAddress = user?.addresses.find(
    ({ id }) => postalProps.addressId === id,
  );

  if (!formData.addresses) throw new Error("formData.addresses doesn't undefined");

  const formAddress = formData.addresses.find(
    (el) => postalProps.addressId === el.id,
  );
  const initialPostalProfile = formAddress?.value.postalCode.value || userAddress?.postalCode || '';
  const [postalProfile, setPostalProfile] = useState(initialPostalProfile);

  // const [country, setCountry] = useState(formAddress?.value.country.value);

  useEffect(() => {
    if (formAddress?.value.postalCode) {
      formAddress.value.postalCode.value = userAddress?.postalCode as string;
      setPostalProfile(formAddress.value.postalCode.value);
    }

    return () => {
      setPostalProfile('');
    };
  }, [user, userAddress]);

  function setPostalPropsContext(value: string, countryCode: string) {
    if (formAddress?.value) {
      formAddress.value.postalCode.isValid = postcodeValidator(
        value,
        countryCode,
      );
      formAddress.value.postalCode.value = value;
    }
  }

  function checkCode(value: string) {
    setPostalProfile(value);
    // setCountry(formAddress?.value.country.value);
    const country = formAddress?.value.country.value;

    if (formAddress?.value) formAddress.value.postalCode.value = value;

    if (typeof country === 'string' && country.length > 1) {
      const countryCode = selectCountryCode(country);

      setIsValid(postcodeValidator(value, countryCode));
      setPostalPropsContext(value, countryCode);
    }
  }

  useEffect(() => {
    checkCode(postalProfile as string);
  }, [postalProps.isChange, formAddress?.value.country.value]);

  useEffect(() => {
    // console.log(formData.addresses);
  }, []);

  return (
    <TextField
      disabled={postalProps.isDisable}
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
