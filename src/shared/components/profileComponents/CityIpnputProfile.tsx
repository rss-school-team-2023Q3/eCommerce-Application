import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

type TypeCity = 'billingCity' | 'shippingCity';

interface ICityInterface {
  cityProps: { type: string; profileCity?: string };
}

export default function CityInputProfile({ cityProps }: ICityInterface) {
  const [isValid, setIsValid] = useState(true);
  const [cityErrorMessage, setCityErrorMessage] = useState('');

  const formData = useContext(profileContext);
  const typeCity: TypeCity = `${cityProps.type}City` as TypeCity;

  formData[typeCity].value = cityProps.profileCity as TypeCity;
  const [cityProfile, setCityProfile] = useState(formData[typeCity].value);

  // useEffect(() => {
  //     formData.lastName.value = cityProps.profileCity;
  //   return () => {
  //     formData.lastName.value = '';
  //   };
  // }, []);

  function checkCity(city: string) {
    setCityProfile(city);
    setIsValid(!validate('city', city));
    setCityErrorMessage(validate('city', city));

    switch (!validate('city', city)) {
      case true: {
        if (cityProps.type === 'shipping') {
          formData.shippingCity.value = city;
          formData.shippingCity.isValid = true;
        } else {
          formData.billingCity.value = city;
          formData.billingCity.isValid = true;
        }

        break;
      }
      default: {
        if (cityProps.type === 'shipping') {
          formData.shippingCity.isValid = false;
        } else {
          formData.billingCity.isValid = false;
        }

        break;
      }
    }
  }

  return (
    <TextField
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
