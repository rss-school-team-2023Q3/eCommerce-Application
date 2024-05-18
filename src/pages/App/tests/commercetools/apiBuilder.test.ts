import { CustomerDraft } from '@commercetools/platform-sdk';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import {
  describe, expect, it, beforeEach,
} from 'vitest';

describe('ApiBuilder', () => {
  let apiBuilder: ApiBuilder;

  beforeEach(() => {
    apiBuilder = new ApiBuilder();
  });

  it('should create an instance', () => {
    expect(apiBuilder).toBeTruthy();
  });

  it('should register a user', async () => {
    const user: CustomerDraft = {
      email: 'test@example.com',
      password: '',
    };

    await expect(apiBuilder.registerUser(user)).resolves.not.toThrow();
  });

  it('should throw an error if the user is not found', async () => {
    const email = 'testteste@example.com';
    const password = 'password';

    await expect(apiBuilder.loginUser(email, password)).rejects.toThrow(
      'Customer account with the given credentials not found',
    );
  });

  it('should get products', async () => {
    await expect(apiBuilder.getProducts()).resolves.not.toThrow();
  });
});
