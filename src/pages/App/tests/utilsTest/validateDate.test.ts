import dayjs from 'dayjs';
import validateDate from 'shared/utils/validateDate';
import { describe, expect, it } from 'vitest';

describe('validateDate function', () => {
  it('should validate date', () => {
    const youngDate = dayjs().subtract(10, 'y');
    const oldDate = dayjs().subtract(101, 'y');
    const validDate = dayjs().subtract(20, 'y');
    const invalidDate = dayjs('invalid date');

    expect(validateDate(youngDate)).toBe('You must be 15 Y.O.');
    expect(validateDate(oldDate)).toBe('Are you so old?');
    expect(validateDate(validDate)).toBe('');
    expect(validateDate(invalidDate)).toBe('Invalid Date');
  });
});
