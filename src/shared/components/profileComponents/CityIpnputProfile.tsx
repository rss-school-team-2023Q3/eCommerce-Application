import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

type TypeCity = 'billingCity' | 'shippingCity';

interface ICityInterface {
  cityProps: { type: string; profileCity?: string; isDisable: boolean };
}

export default function CityInputProfile({ cityProps }: ICityInterface) {
  const [isValid, setIsValid] = useState(true);
  const [cityErrorMessage, setCityErrorMessage] = useState('');

  const formData = useContext(profileContext);

  const typeCity: TypeCity = `${cityProps.type}City` as TypeCity;

  formData[typeCity].value = cityProps.profileCity as TypeCity;
  const [cityProfile, setCityProfile] = useState(formData[typeCity].value);

  function checkCity(city: string) {
    setCityProfile(city);
    setIsValid(!validate('city', city));
    setCityErrorMessage(validate('city', city));

    switch (!validate('city', city)) {
      case true: {
        formData[typeCity].value = city;
        formData[typeCity].isValid = true;
        break;
      }
      default: {
        formData[typeCity].isValid = false;

        break;
      }
    }
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
