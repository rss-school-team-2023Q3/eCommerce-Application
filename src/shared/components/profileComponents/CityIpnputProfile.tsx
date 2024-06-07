import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import validate from 'shared/utils/validate';

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
  const [cityProfile, setCityProfile] = useState('');

  const formData = useContext(profileContext);

  const user = useSelector((state: RootState) => state.auth.user);
  const userAddress = user?.addresses.find(
    ({ id }) => cityProps.addressId === id
  );

  // if (!formData.addresses) throw new Error("formData.addresses doesn't undefined");

  const formAddress = formData.addresses?.find(
    (el) => cityProps.addressId === el.id
  );

  useEffect(() => {
    const initialCityProfile =
      formAddress?.value.city.value || userAddress?.city || '';

    setCityProfile(initialCityProfile);
  }, [formAddress, userAddress]);

  function checkCity(city: string) {
    setCityProfile(city);
    setIsValid(!validate('city', city));
    setCityErrorMessage(validate('city', city));

    if (formAddress?.value.city) {
      formAddress.value.city.value = city;
      formAddress.value.city.isValid = !validate('city', city);
    }
  }

  const isCityChanged = cityProfile !== (userAddress?.city || '');

  return (
    <div className="field-wrap">
      <TextField
        className="input-field-profile"
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
      {isCityChanged && (
        <PublishedWithChangesIcon
          className={`change-icon-address ${cityProps.type === 'shipping' ? 'right-zero' : 'left-zero'}`}
        />
      )}
    </div>
  );
}
