import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';

function DateInput() {
  const minAge = dayjs().subtract(15, 'y');
  const [isValid, setIsValid] = useState(true);
  const formData = useContext(formContext);

  function checkDate(date: Dayjs) {
    setIsValid(
      date < dayjs().subtract(15, 'y') && date > dayjs().subtract(100, 'y'),
    );

    if (
      date < dayjs().subtract(15, 'y')
      && date.isValid()
      && date > dayjs().subtract(100, 'y')
    ) {
      formData.date.value = date;
      formData.date.isValid = true;
    } else {
      formData.date.isValid = false;
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
