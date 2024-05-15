import {
  ByProjectKeyRequestBuilder,
  CustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  anonymousAuthMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
} from './middlewareOptions.ts';
import { tokenCache } from './tokenCache.ts';

export class ApiBuilder {
  private projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

  private client: Client | undefined;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  private buildClient() {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware();
  }

  private createApiRoot(client: Client) {
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  private createWithPasswordClient(email: string, password: string) {
    const options = passwordAuthMiddlewareOptions;

    options.credentials.user = {
      username: email,
      password,
    };

    this.client = this.buildClient().withPasswordFlow(options).build();
    this.apiRoot = this.createApiRoot(this.client);
  }

  public async registerUser(user: CustomerDraft) {
    try {
      await this.apiRoot
        ?.customers()
        .post({
          body: user,
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async createAnonymousClient() {
    const options = anonymousAuthMiddlewareOptions;

    this.client = this.buildClient().withAnonymousSessionFlow(options).build();
    this.apiRoot = this.createApiRoot(this.client);
  }

  public async loginUser(email: string, password: string) {
    this.createWithPasswordClient(email, password);

    try {
      tokenCache.clear();
      await this.apiRoot
        ?.me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async getProducts() {
    try {
      await this.apiRoot?.products().get().execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
