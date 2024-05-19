import { createAddress } from 'shared/utils/createAddress';
import { describe, expect, it } from 'vitest';

describe('createAddress function', () => {
  it('should create a new address', () => {
    const addressData = {
      testCountry: { value: 'Great Britain' },
      testCity: { value: 'London' },
      testCode: { value: 'SW1W 0NY' },
      testStreet: { value: 'King Street' },
    };

    const result = createAddress(addressData, 'test');

    expect(result).toEqual({
      country: 'GB',
      city: 'London',
      postalCode: 'SW1W 0NY',
      streetName: 'King Street',
    });
  });
});
