import {
  anonymousAuthMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
} from 'shared/libs/commercetools/middlewareOptions';
import { describe, test, assert } from 'vitest';

describe('Middleware options tests', () => {
  test('httpMiddlewareOptions should have correct host', () => {
    assert.equal(httpMiddlewareOptions.host, import.meta.env.VITE_CTP_API_URL);
  });

  test('passwordAuthMiddlewareOptions should have correct host and projectKey', () => {
    assert.equal(
      passwordAuthMiddlewareOptions.host,
      import.meta.env.VITE_CTP_AUTH_URL,
    );
    assert.equal(
      passwordAuthMiddlewareOptions.projectKey,
      import.meta.env.VITE_CTP_PROJECT_KEY,
    );
  });

  test('anonymousAuthMiddlewareOptions should have correct host and projectKey', () => {
    assert.equal(
      anonymousAuthMiddlewareOptions.host,
      import.meta.env.VITE_CTP_AUTH_URL,
    );
    assert.equal(
      anonymousAuthMiddlewareOptions.projectKey,
      import.meta.env.VITE_CTP_PROJECT_KEY,
    );
  });
});
