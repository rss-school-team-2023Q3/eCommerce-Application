import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import validate from 'shared/utils/validate';

interface IStreetInterface {
  streetProps: {
    type: string;
    profileStreet: string;
    isDisable: boolean;
    addressId: string;
  };
}

function StreetProfile({ streetProps }: IStreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const [streetErrorMessage, setStreetErrorMessage] = useState('');
  const [streetProfile, setStreetProfile] = useState<string>('');

  const user = useSelector((state: RootState) => state.auth.user);
  const userAddress = user?.addresses.find(
    ({ id }) => streetProps.addressId === id,
  );

  const formData = useContext(profileContext);

  if (!formData.addresses) throw new Error("formData.addresses doesn't undefined");

  const formAddress = formData.addresses.find(
    (el) => streetProps.addressId === el.id,
  );

  useEffect(() => {
    const initialStreetProfile = formAddress?.value.streetName.value || userAddress?.streetName || '';

    setStreetProfile(initialStreetProfile);
  }, [formAddress, userAddress]);

  function checkStreet(street: string) {
    setStreetProfile(street);
    setIsValid(!validate('street', street));
    setStreetErrorMessage(validate('street', street));

    if (!formAddress?.value.streetName) throw new Error("formAddress.streetName doesn't define");

    formAddress.value.streetName.value = street;
    formAddress.value.streetName.isValid = !validate('street', street);
  }

  const isStreetChanged = streetProfile !== (userAddress?.streetName || '');

  return (
    <div className="field-wrap">
      <TextField
        className="input-field-profile"
        disabled={streetProps.isDisable}
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
      {isStreetChanged && <PublishedWithChangesIcon className="change-icon" />}
    </div>
  );
}

export default StreetProfile;
