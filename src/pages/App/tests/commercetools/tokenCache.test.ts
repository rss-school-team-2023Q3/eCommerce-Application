import { TokenStore } from '@commercetools/sdk-client-v2';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';
import { describe, expect, it, beforeEach } from 'vitest';

describe('MyTokenCache', () => {
  beforeEach(() => {
    tokenCache.clear();
  });

  it('should start with an empty cache', () => {
    const cache = tokenCache.get();

    expect(cache.token).toEqual('');
    expect(cache.expirationTime).toEqual(0);
    expect(cache.refreshToken).toEqual('');
  });

  it('should set and get the cache correctly', () => {
    const newCache: TokenStore = {
      token: 'token',
      expirationTime: 12345,
      refreshToken: 'refreshToken',
    };

    tokenCache.set(newCache);
    expect(tokenCache.get()).toEqual(newCache);
  });

  it('should clear the cache correctly', () => {
    const newCache: TokenStore = {
      token: 'token',
      expirationTime: 12345,
      refreshToken: 'refreshToken',
    };

    tokenCache.set(newCache);
    tokenCache.clear();
    const cache = tokenCache.get();

    expect(cache.token).toEqual('');
    expect(cache.expirationTime).toEqual(0);
    expect(cache.refreshToken).toEqual('');
  });
});
