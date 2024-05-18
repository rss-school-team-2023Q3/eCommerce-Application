import dayjs, { Dayjs } from 'dayjs';

function validateDate(date: Dayjs) {
  let errorMessage = '';

  if (!date) {
    errorMessage = 'Enter your birth day';
  } else if (date > dayjs().subtract(15, 'y')) {
    errorMessage = 'You must be 15 Y.O.';
  } else if (date < dayjs().subtract(100, 'y')) {
    errorMessage = 'Are you so old?';
  } else if (!date.isValid()) {
    errorMessage = 'Invalid Date';
  }

  return errorMessage;
}

export default validateDate;
