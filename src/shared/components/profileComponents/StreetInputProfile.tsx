import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

type TypeStreet = 'billingStreet' | 'shippingStreet';

interface IStreetInterface {
  streetProps: { type: string; profileStreet?: string };
}

function StreetInputProfile({ streetProps }: IStreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const [streetErrorMessage, setStreetErrorMessage] = useState('');

  const formData = useContext(profileContext);
  const typeStreet: TypeStreet = `${streetProps.type}Street` as TypeStreet;

  formData[typeStreet].value = streetProps.profileStreet as TypeStreet;
  const [streetProfile, setStreetProfile] = useState(
    formData[typeStreet].value,
  );

  function checkStreet(street: string) {
    setStreetProfile(street);
    setIsValid(!validate('street', street));
    setStreetErrorMessage(validate('street', street));

    switch (!validate('street', street)) {
      case true: {
        if (streetProps.type === 'shipping') {
          formData.shippingStreet.value = street;
          formData.shippingStreet.isValid = true;
        } else {
          formData.billingStreet.value = street;
          formData.billingStreet.isValid = true;
        }

        break;
      }
      default: {
        if (streetProps.type === 'shipping') {
          formData.shippingStreet.isValid = false;
        } else {
          formData.billingStreet.isValid = false;
        }
      }
    }
  }

  return (
    <TextField
      value={streetProfile}
      autoComplete="off"
      type="Text"
      size="small"
      style={{ marginBottom: '10px' }}
      required
      onChange={(e) => checkStreet(e.target.value)}
      label="Street"
      helperText={isValid ? '' : streetErrorMessage}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default StreetInputProfile;
