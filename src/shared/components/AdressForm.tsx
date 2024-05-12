import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

function AdressForm() {
  const [email, setEmail] = useState('');

  return (
    <>
      <TextField
        autoComplete="off"
        type="Text"
        size="small"
        style={{ marginBottom: '10px' }}
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="street"
        // helperText={true ? 'Please enter your name' : 'req'}
        label="Street"
      />
      <TextField
        autoComplete="off"
        type="Text"
        style={{ marginBottom: '10px' }}
        required
        size="small"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="city"
        label="City"
      />
      <TextField
        autoComplete="off"
        type="Text"
        style={{ marginBottom: '10px' }}
        required
        size="small"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="Postal Code"
        id="postal_code"
      />
      <FormControl size="small">
        <InputLabel id="demo-select-small-label">Country</InputLabel>
        <Select
          id="country"
          style={{ marginBottom: '10px' }}
          labelId="demo-select-small-label"
          label="Country"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <MenuItem value="belarus">Belarus</MenuItem>
          <MenuItem value="ukrain">Ukrain</MenuItem>
          <MenuItem value="poland">Poland</MenuItem>
          <MenuItem value="lithuania">Lithuania</MenuItem>
          <MenuItem value="georgia">Georgia</MenuItem>
          <MenuItem value="switzerland">Switzerland</MenuItem>
          <MenuItem value="spain">Spain</MenuItem>
          <MenuItem value="italy">Italy</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default AdressForm;
