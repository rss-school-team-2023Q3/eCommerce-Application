import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private static readonly EMPTY_CACHE: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  private cache: TokenStore = { ...MyTokenCache.EMPTY_CACHE };

  set(newCache: TokenStore): void {
    this.cache = newCache;
  }

  get(): TokenStore {
    return this.cache;
  }

  clear(): void {
    this.cache = { ...MyTokenCache.EMPTY_CACHE };
  }
}

export const tokenCache = new MyTokenCache();
