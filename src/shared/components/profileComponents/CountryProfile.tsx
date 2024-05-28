import {
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import changeCountryName from 'pages/ProfilePage/utils/changeCountryName';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext } from 'react';

interface ICountryInterface {
  countryProps: {
    isUpdate: (type: string) => void;
    type: string;
    profileCountry?: string;
  };
}

type TypeCountry = 'billingCountry' | 'shippingCountry';

function CountryInput({ countryProps }: ICountryInterface) {
  const countries = ['Great Britain', 'Germany', 'Canada', 'USA'];
  const formData = useContext(profileContext);

  const typeCountry: TypeCountry = `${countryProps.type}Country` as TypeCountry;

  formData[typeCountry].value = changeCountryName(countryProps.profileCountry);
  // const [countryProfile, setContryProfile] = useState(changeCountryName(countryProps.profileCountry));

  function selectCountry(country: string) {
    formData[typeCountry].value = country;
    formData[typeCountry].isValid = true;
    countryProps.isUpdate(countryProps.type);
  }

  // if (countryProps.profileCountry) selectCountry(countryProps.profileCountry);

  return (
    <FormControl size="small">
      <InputLabel id="country_select">Country</InputLabel>
      <Select
        style={{ marginBottom: '10px' }}
        labelId="country_select"
        label="Country"
        defaultValue={
          countryProps.profileCountry
            ? changeCountryName(countryProps.profileCountry)
            : ''
        }
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
  );
}

export default CountryInput;
