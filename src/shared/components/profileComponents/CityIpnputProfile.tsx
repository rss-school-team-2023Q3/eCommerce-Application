import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import validate from 'shared/utils/validate';

// type TypeCity = 'billingCity' | 'shippingCity';

interface ICityInterface {
  cityProps: {
    type: string;
    profileCity?: string;
    isDisable: boolean;
    addressId: string;
  };
}

export default function CityInputProfile({ cityProps }: ICityInterface) {
  const [isValid, setIsValid] = useState(true);
  const [cityErrorMessage, setCityErrorMessage] = useState('');

  const formData = useContext(profileContext);

  const user = useSelector((state: RootState) => state.auth.user);
  const userAddress = user?.addresses.find(
    ({ id }) => cityProps.addressId === id,
  );
  // const typeCity: TypeCity = `${cityProps.type}City` as TypeCity;

  // formData[typeCity].value = cityProps.profileCity as TypeCity;
  const [cityProfile, setCityProfile] = useState(userAddress?.city);

  if (!formData.addresses) throw new Error("formData.addresses doesn't undefined");

  const formAddress = formData.addresses.find(
    (el) => cityProps.addressId === el.id,
  );

  useEffect(() => {
    if (formAddress?.value.city) {
      formAddress.value.city.value = userAddress?.city as string;
      setCityProfile(formAddress.value.city.value);
    }

    return () => {
      setCityProfile('');
    };
  }, [user, userAddress]);

  function checkCity(city: string) {
    setCityProfile(city);
    setIsValid(!validate('city', city));
    setCityErrorMessage(validate('city', city));

    if (!formAddress?.value.city) throw new Error("formAddress.streetName doesn't define");

    formAddress.value.city.value = city;
    formAddress.value.city.isValid = !validate('city', city);
  }

  return (
    <TextField
      disabled={cityProps.isDisable}
      value={cityProfile}
      autoComplete="off"
      type="Text"
      size="small"
      style={{ marginBottom: '10px' }}
      required
      onChange={(e) => checkCity(e.target.value)}
      label="City"
      helperText={isValid ? '' : cityErrorMessage}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}
