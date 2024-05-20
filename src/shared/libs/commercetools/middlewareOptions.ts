import {
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenCache.ts';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  refreshToken: '',
  tokenCache, // may be delete for getting a new token ??
  fetch,
};

export const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    user: {
      username: '',
      password: '',
    },
  },
  scopes: [import.meta.env.VITE_CTP_SCOPES],
  tokenCache,
  fetch,
};

export const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
  },
  scopes: [import.meta.env.VITE_CTP_SCOPES],
  tokenCache,
  fetch,
};
