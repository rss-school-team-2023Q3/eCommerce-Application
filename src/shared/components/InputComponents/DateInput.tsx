import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import 'dayjs/locale/ru';
import validateDate from 'shared/utils/validateDate';
interface IDateInterface {
  dateProps: { isChange: (type: boolean) => void };
}
function DateInput({ dateProps }: IDateInterface) {
  dayjs.locale('ru');
  const minAge = dayjs().subtract(15, 'y');
  const [isValid, setIsValid] = useState(true);
  const [dateErrorMessage, setDateErrorMessage] = useState('');
  const formData = useContext(formContext);

  function checkDate(date: Dayjs) {
    dateProps.isChange(true);
    setIsValid(!validateDate(date));
    setDateErrorMessage(validateDate(date));
    if (!validateDate(date)) {
      formData.date.value = date;
      formData.date.isValid = true;
    } else {
      formData.date.isValid = false;
    }
    dateProps.isChange(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DateField
        style={{ marginBottom: '10px' }}
        label="Date of birth"
        required
        maxDate={minAge}
        helperText={isValid ? '' : dateErrorMessage}
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
