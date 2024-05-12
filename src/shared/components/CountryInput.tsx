import {
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import CountryInterface from 'pages/App/types/CountryInterface';

function CountryInput({ returnCountry }: CountryInterface) {
  return (
    <FormControl size="small">
      <InputLabel id="demo-select-small-label">Country</InputLabel>
      <Select
        id="country"
        style={{ marginBottom: '10px' }}
        labelId="demo-select-small-label"
        label="Country"
        required
        onChange={(e) => returnCountry(e.target.value as string)}
      >
        <MenuItem value="GB">Great Britain</MenuItem>
        <MenuItem value="germany">Germany</MenuItem>
        <MenuItem value="canada">Canada</MenuItem>
        <MenuItem value="USA">USA</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CountryInput;
