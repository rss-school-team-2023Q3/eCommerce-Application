import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import DateInterface from 'pages/App/types/DateInterface';
import { useState } from 'react';

function DateInput({ returnDate }: DateInterface) {
  const minAge = dayjs().subtract(15, 'y');
  const [isValid, setIsValid] = useState(true);

  function checkDate(date: Dayjs) {
    setIsValid(date < dayjs().subtract(15, 'y'));

    if (isValid && date.isValid()) {
      returnDate(date);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        style={{ marginBottom: '10px' }}
        label="Date of birth"
        required
        maxDate={minAge}
        helperText={isValid ? '' : 'You must be 15 Y.O.'}
        FormHelperTextProps={{
          sx: {
            color: 'red',
          },
        }}
        size="small"
        onChange={(value) => checkDate(value as Dayjs)}
      />
    </LocalizationProvider>
  );
}

export default DateInput;