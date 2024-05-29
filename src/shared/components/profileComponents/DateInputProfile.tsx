import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import 'dayjs/locale/ru';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validateDate from 'shared/utils/validateDate';

interface IDateInterface {
  dateProps: { isChange: (type: boolean) => void; isDisable: boolean };
}

function DateInput({ dateProps }: IDateInterface) {
  dayjs.locale('ru');
  const minAge = dayjs().subtract(15, 'y');
  const [isValid, setIsValid] = useState(true);
  const [dateErrorMessage, setDateErrorMessage] = useState('');
  const formData = useContext(profileContext);

  const user = useSelector((state: RootState) => state.auth.user);

  const [dateBird, setDateBird] = useState(formData.date.value);

  useEffect(() => {
    if (user && typeof user.dateOfBirth === 'string') {
      formData.date.value = dayjs(user.dateOfBirth);
      setDateBird(formData.date.value);
    } else {
      formData.date.value = dayjs('');
    }

    setIsValid(true);
  }, []);

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
        disabled={dateProps.isDisable}
        value={dateBird}
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
