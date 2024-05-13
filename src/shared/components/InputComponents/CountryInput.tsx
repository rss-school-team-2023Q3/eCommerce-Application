import {
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';

import ICountryInterface from './InputComponentInterface/CountryInterface.ts';

function CountryInput({ returnCountry }: ICountryInterface) {
  const countries = ['Great Britain', 'Germany', 'Canada', 'USA'];

  return (
    <FormControl size="small">
      <InputLabel id="country_select">Country</InputLabel>
      <Select
        id="country"
        style={{ marginBottom: '10px' }}
        labelId="country_select"
        label="Country"
        defaultValue=""
        required
        onChange={(e) => returnCountry(e.target.value as string)}
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
