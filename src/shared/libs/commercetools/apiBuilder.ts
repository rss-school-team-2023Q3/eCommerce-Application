import {
  ByProjectKeyRequestBuilder,
  CustomerDraft,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import IDataAction from 'pages/App/types/interfaces/IDataAction.ts';
import { toastError } from 'shared/utils/notifications.ts';

import {
  anonymousAuthMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
  refreshAuthMiddlewareOptions,
} from './middlewareOptions.ts';
import { tokenCache } from './tokenCache.ts';

export class ApiBuilder {
  private projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

  private client: Client | undefined;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  static client = new ApiBuilder();

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

  public async createRefreshTokenClient(): Promise<Customer | null> {
    const options = refreshAuthMiddlewareOptions;

    options.refreshToken = JSON.parse(
      localStorage.getItem('tokenCacheGG') as string,
    ).refreshToken;
    try {
      this.client = this.buildClient().withRefreshTokenFlow(options).build();
      this.apiRoot = this.createApiRoot(this.client);
      const resp = await this.apiRoot.me().get().execute();

      return resp.body;
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      }

      return null;
    }
  }

  public async createAnonymousClient() {
    const options = anonymousAuthMiddlewareOptions;

    this.client = this.buildClient().withAnonymousSessionFlow(options).build();
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

  public async loginUser(email: string, password: string) {
    this.createWithPasswordClient(email, password);
    let resp;
    try {
      tokenCache.clear();
      resp = await this.apiRoot
        ?.me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      localStorage.setItem('tokenCacheGG', JSON.stringify(tokenCache.get()));
    } catch (error) {
      if (error instanceof Error) {
        resp = error.message;
        throw new Error(error.message);
      }
    }

    return resp;
  }

  public async getProducts() {
    let resp;
    try {
      resp = await this.apiRoot?.products().get().execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }
  // .get({queryArgs: {limit:10}})

  public async getProductsDiscount() {
    let resp;
    try {
      resp = await this.apiRoot?.productDiscounts().get().execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }

  public async updateUserData(
    actions: IDataAction[],
    ID: string,
    version: number,
  ) {
    let resp;
    const body = {
      version,
      actions: actions as CustomerUpdateAction[],
    };

    try {
      resp = await this.apiRoot
        ?.customers()
        .withId({ ID })
        .post({
          body,
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }
}
