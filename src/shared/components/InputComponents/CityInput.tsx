import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function CityInput() {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkCity(city: string) {
    setIsValid(validate(regexp, city));

    if (validate(regexp, city)) {
      formData.city.value = city;
      formData.city.isValid = true;
    } else {
      formData.city.isValid = false;
    }
  }

  return (
    <TextField
      autoComplete="off"
      type="Text"
      size="small"
      style={{ marginBottom: '10px' }}
      required
      onChange={(e) => checkCity(e.target.value)}
      label="City"
      helperText={isValid ? '' : 'Enter city name'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default CityInput;
