import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext } from 'react';

interface ICountryInterface {
  countryProps: {
    isUpdate: (type: string) => void;
    type: string;
  };
}

function CountryInput({ countryProps }: ICountryInterface) {
  const countries = ['Great Britain', 'Germany', 'Canada', 'USA'];
  const formData = useContext(formContext);

  function selectCountry(country: string) {
    countryProps.isUpdate(countryProps.type);

    switch (countryProps.type) {
      case 'billing': {
        formData.billingCountry.value = country;
        formData.billingCountry.isValid = true;
        break;
      }
      case 'shipping': {
        formData.shippingCountry.value = country;
        formData.shippingCountry.isValid = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <FormControl size="small">
      <InputLabel id="country_select">Country</InputLabel>
      <Select
        style={{ marginBottom: '10px' }}
        labelId="country_select"
        label="Country"
        defaultValue=""
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
