import {
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import CountryInterface from 'pages/App/types/CountryInterface';

function CountryInput({ returnCountry }: CountryInterface) {
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
        <MenuItem value="Great Britain">Great Britain</MenuItem>
        <MenuItem value="Germany">Germany</MenuItem>
        <MenuItem value="Canada">Canada</MenuItem>
        <MenuItem value="USA">USA</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CountryInput;
