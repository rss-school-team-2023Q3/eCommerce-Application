import {
  TokenCache,
  // TokenCacheOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  myCaсhe: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(newCache: TokenStore) {
    this.myCaсhe = newCache;
  }

  get() {
    return this.myCaсhe;
  }
}

export const tokenCache = new MyTokenCache();
