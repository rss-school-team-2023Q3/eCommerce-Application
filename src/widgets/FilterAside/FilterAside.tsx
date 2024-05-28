import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import './FilterAside.modules.css';
import { ChangeEvent, useState } from 'react';

function FilterAside() {
  const [manufacture, setManufacture] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(2000);

  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOnSale(event.target.checked);
  };
  const handleChangeManufacture = (
    event: SelectChangeEvent<typeof manufacture>,
  ) => {
    setManufacture(event.target.value);
  };

  const resetFilters = () => {
    setManufacture('');
    setIsOnSale(false);
    setMinCost(0);
    setMaxCost(2000);
  };

  return (
    <aside className="catalog-aside">
      <FormControlLabel
        checked={isOnSale}
        value="start"
        control={(
          <Switch
            checked={isOnSale}
            onChange={handleChangeSale}
            color="primary"
          />
        )}
        label="On sale!"
        labelPlacement="end"
      />
      <Divider variant="middle" />
      <span>Manufacturer</span>
      <FormControl className="manufacture-select">
        <InputLabel id="manufacturer">Manufacturer</InputLabel>
        <Select
          labelId="manufacturer"
          value={manufacture}
          label="Manufacturer"
          onChange={handleChangeManufacture}
        >
          <MenuItem value="Palit">Palit</MenuItem>
          <MenuItem value="ASUS">ASUS</MenuItem>
          <MenuItem value="Sapphire">Sapphire</MenuItem>
          <MenuItem value="be quiet!">be quiet!</MenuItem>
          <MenuItem value="ASRock">ASRock</MenuItem>
          <MenuItem value="AMD">AMD</MenuItem>
          <MenuItem value="MSI">MSI</MenuItem>
          <MenuItem value="Intel">Intel</MenuItem>
          <MenuItem value="Seagate">Seagate</MenuItem>
          <MenuItem value="Toshiba">Toshiba</MenuItem>
          <MenuItem value="DeepCool">DeepCool</MenuItem>
        </Select>
      </FormControl>
      <Divider variant="middle" />
      <span>Price</span>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          label="min"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: '90px' }}
          value={minCost}
          onChange={(e) => {
            setMinCost(Number(e.target.value));
          }}
        />
        <Typography>-</Typography>
        <TextField
          label="max"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: '90px' }}
          value={maxCost}
          onChange={(e) => {
            setMaxCost(Number(e.target.value));
          }}
        />
      </Stack>
      <Divider variant="middle" />
      <div className="aside-buttons">
        <Button variant="contained">Filter</Button>
        <Button onClick={resetFilters} variant="contained">
          Reset
        </Button>
      </div>
    </aside>
  );
}

export default FilterAside;
