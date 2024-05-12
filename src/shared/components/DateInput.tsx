import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

function DateInput() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const tomorrow = dayjs().add(1, 'day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        style={{ marginBottom: '10px' }}
        label="Date of birth"
        value={value}
        minDate={tomorrow}
        size="small"
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
