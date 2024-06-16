import validate from 'shared/utils/validate';
import { describe, expect, it } from 'vitest';

describe('validate', () => {
  it('should return error message for invalid email', () => {
    const inputType = 'email';
    const value = 'invalidEmail';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe('Email must contain an "@" symbol');
  });

  it('should return empty string for valid email', () => {
    const inputType = 'email';
    const value = 'test@example.com';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe('');
  });

  it('should return error message for invalid password', () => {
    const inputType = 'password';
    const value = 'invalid1Password';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe(
      'Password must contain at least one special character'
    );
  });

  it('should return empty string for valid password', () => {
    const inputType = 'password';
    const value = 'ValidPassword1!';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe('');
  });

  it('should return error message for invalid city name', () => {
    const inputType = 'city';
    const value = 'InvalidCity123';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe(
      "City name mustn't contain special characters or numbers"
    );
  });

  it('should return error message for invalid street name', () => {
    const inputType = 'street';
    const value = 'InvalidStreet@';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe("Street name mustn't contain special characters");
  });

  it('should return error message for invalid name', () => {
    const inputType = 'name';
    const value = 'InvalidName123';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe('No special characters or numbers');
  });

  it('should return error message for invalid last name', () => {
    const inputType = 'lastName';
    const value = 'InvalidLastName123';
    const errorMessage = validate(inputType, value);

    expect(errorMessage).toBe('No special characters or numbers');
  });
});
