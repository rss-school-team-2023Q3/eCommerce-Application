import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private static readonly EMPTY_CACHE: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  private cache: TokenStore = { ...MyTokenCache.EMPTY_CACHE };

  constructor() {
    const savedCache = localStorage.getItem('tokenCacheGG');

    if (savedCache) {
      this.cache = JSON.parse(savedCache);
    }
  }

  set(newCache: TokenStore): void {
    this.cache = newCache;
    // localStorage.setItem('tokenCacheGG', JSON.stringify(this.cache));
  }

  get(): TokenStore {
    return this.cache;
  }

  clear(): void {
    this.cache = { ...MyTokenCache.EMPTY_CACHE };
    localStorage.removeItem('tokenCacheGG');
  }
}

export const tokenCache = new MyTokenCache();
