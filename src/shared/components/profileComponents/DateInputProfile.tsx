import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import 'dayjs/locale/ru';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
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

  const [dateBirth, setDateBirth] = useState<Dayjs | null>(formData.date.value);
  const [isDateChanged, setIsDateChanged] = useState(false);

  useEffect(() => {
    if (user && typeof user.dateOfBirth === 'string') {
      const userDateOfBirth = dayjs(user.dateOfBirth);

      formData.date.value = userDateOfBirth;
      setDateBirth(userDateOfBirth);
      setIsDateChanged(false);
    } else {
      formData.date.value = dayjs('');
    }

    setIsValid(true);
  }, [user, formData.date]);

  useEffect(() => {
    if (dateBirth) formData.date.value = dateBirth;
  }, [dateProps.isDisable]);

  useEffect(() => {
    // if (!formData.fieldChangedSet) {
    //   throw new Error("formData.fieldChangedSet doesn't exist");
    // }

    if (dateProps.isDisable && user?.dateOfBirth) {
      const userDateOfBirth = dayjs(user.dateOfBirth);

      setDateBirth(userDateOfBirth);

      setIsDateChanged(false);
      formData.fieldChangedSet?.delete(FormField.dateOfBirth);
    } else if (!dateProps.isDisable) {
      const isDateHasChanged = isValid
        && formData.date.value.format('YYYY-MM-DD') !== user?.dateOfBirth;

      setIsDateChanged(isDateHasChanged);

      if (isDateHasChanged) {
        formData.fieldChangedSet?.add(FormField.dateOfBirth);
      } else {
        // setIsDateChanged(false)
        formData.fieldChangedSet?.delete(FormField.dateOfBirth);
      }
    }
  }, [dateProps.isDisable, isValid, user?.dateOfBirth, formData]);

  function checkDate(date: Dayjs | null) {
    if (!date) return;

    dateProps.isChange(true);
    const dateValidationError = validateDate(date);
    const isDateValid = !dateValidationError;

    setIsValid(isDateValid);
    setDateErrorMessage(dateValidationError);

    if (isDateValid && date) {
      formData.date.value = date;
      formData.date.isValid = true;
      setIsDateChanged(date.format('YYYY-MM-DD') !== user?.dateOfBirth);
    } else {
      formData.date.isValid = false;
      setIsDateChanged(false);
    }

    setDateBirth(date);
    dateProps.isChange(false);
  }

  return (
    <div className="field-wrap">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DateField
          className="input-field-profile"
          disabled={dateProps.isDisable}
          value={dateBirth}
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
      {isDateChanged && <PublishedWithChangesIcon className="change-icon" />}
    </div>
  );
}

export default DateInput;
