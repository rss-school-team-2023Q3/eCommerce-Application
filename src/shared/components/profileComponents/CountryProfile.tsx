import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import changeCountryName from 'pages/ProfilePage/utils/changeCountryName';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import selectCountryCode from 'shared/utils/selectCountryCode';

interface ICountryInterface {
  countryProps: {
    isUpdate: (type: string) => void;
    type: string;
    profileCountry?: string;
    isDisable: boolean;
    addressId: string;
  };
}

// type TypeCountry = 'billingCountry' | 'shippingCountry';

function CountryInput({ countryProps }: ICountryInterface) {
  const countries = ['Great Britain', 'Germany', 'Canada', 'USA'];
  const formData = useContext(profileContext);

  // if (!formData.addresses) throw new Error("formData.addresses doesn't undefined");
  // const typeCountry: TypeCountry = `${countryProps.type}Country` as TypeCountry;

  // formData[typeCountry].value = changeCountryName(countryProps.profileCountry);
  const user = useSelector((state: RootState) => state.auth.user);
  const userAddress = user?.addresses.find(
    ({ id }) => countryProps.addressId === id
  );
  const [countryProfile, setCountryProfile] = useState(
    changeCountryName(userAddress?.country)
  );

  const [isChangeCountry, setIsChangeCountry] = useState(false);
  const formAddress = formData.addresses?.find(
    (el) => countryProps.addressId === el.id
  );

  function selectCountry(country: string) {
    if (!formAddress?.value) return;

    setCountryProfile(country);

    formAddress.value.country.value = country;
    formAddress.value.country.isValid = true;
    countryProps.isUpdate(countryProps.type);
    setIsChangeCountry(
      selectCountryCode(formAddress?.value.country.value as string) !==
        userAddress?.country
    );
  }

  return (
    <div className="field-wrap">
      <FormControl className="input-field-profile" size="small">
        <InputLabel id="country_select">Country</InputLabel>
        <Select
          disabled={countryProps.isDisable}
          style={{ marginBottom: '10px' }}
          labelId="country_select"
          label="Country"
          value={countryProfile ?? ' '}
          defaultValue={changeCountryName(userAddress?.country)}
          required
          onChange={(e) => selectCountry(e.target.value as string)}
        >
          {countries.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isChangeCountry && (
        <PublishedWithChangesIcon
          className={`change-icon-address ${countryProps.type === 'shipping' ? 'right-zero' : 'left-zero'}`}
        />
      )}
    </div>
  );
}

export default CountryInput;
