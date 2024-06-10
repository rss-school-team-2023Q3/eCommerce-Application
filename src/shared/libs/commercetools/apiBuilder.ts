import {
  ByProjectKeyRequestBuilder,
  CustomerDraft,
  createApiBuilderFromCtpClient,
  Customer,
  MyCustomerChangePassword,
  CustomerUpdateAction,
  Address,
  MyCustomerUpdateAction,
  MyCustomerChangeAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import IDataActions from 'pages/App/types/interfaces/IDataAction.ts';
import capitalizeFirstLetter from 'shared/utils/capitalizeFirstLetter.ts';
import { toastError } from 'shared/utils/notifications.ts';

import {
  anonymousAuthMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
  refreshAuthMiddlewareOptions,
} from './middlewareOptions.ts';
import { tokenCache } from './tokenCache.ts';

class ApiBuilder {
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
    let resp;
    try {
      resp = await this.apiRoot
        ?.me()
        ?.login()
        .post({
          body: {
            email,
            password,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
          },
        })
        .execute();

      if (resp?.statusCode === 200) {
        tokenCache.clear();
        this.createWithPasswordClient(email, password);
        this.getCartList().then((response) => {
          response?.body.results.map((item) => {
            if (item.cartState !== 'Active') this.removeCart(item.id, item.version);

            return false;
          });
        });
        setTimeout(() => {
          localStorage.setItem(
            'tokenCacheGG',
            JSON.stringify(tokenCache.get()),
          );
        }, 1000);
      }
    } catch (error) {
      if (error instanceof Error) {
        resp = error.message;
        throw new Error(error.message);
      }
    }

    return resp;
  }

  public async getProducts(filterQuery: string, sortQuery: string) {
    let resp;
    try {
      resp = filterQuery.length
        ? await this.apiRoot
          ?.products()
          .get({
            queryArgs: {
              where: filterQuery,
              sort: sortQuery,
              limit: 50,
            },
          })
          .execute()
        : await this.apiRoot
          ?.products()
          .get({
            queryArgs: {
              limit: 50,
              sort: sortQuery,
            },
          })
          .execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }

  public async getProductsDiscount() {
    let resp;
    try {
      resp = await this.apiRoot?.productDiscounts().get().execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }

  public async getFilterProducts(
    filterQuery: string[],
    sortQuery: string,
    searchQuery: string,
  ) {
    let resp;
    try {
      resp = filterQuery.length
        ? await this.apiRoot
          ?.productProjections()
          .search()
          .get({
            queryArgs: {
              fuzzy: true,
              'text.en': searchQuery,
              filter: filterQuery,
              sort: sortQuery,
              limit: 50,
            },
          })
          .execute()
        : (resp = await this.apiRoot
          ?.productProjections()
          .search()
          .get({
            queryArgs: {
              fuzzy: true,
              'text.en': searchQuery,
              sort: sortQuery,
              limit: 50,
            },
          })
          .execute());
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }

  public async updateUserData(
    actions: IDataActions[],
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

  public async updatePassword(body: MyCustomerChangePassword) {
    let resp;

    try {
      resp = await this.apiRoot
        ?.me()
        .password()
        .post({
          body,
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async getProduct(id: string) {
    let resp;
    try {
      resp = await this.apiRoot?.products().withId({ ID: id }).get().execute();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return resp;
  }

  public async addNewAddress(ID: string, version: number, address: Address) {
    const actions: CustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address,
      },
    ];
    const body = {
      version,
      actions,
    };
    let resp;
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

  public async setShippingOrBillingAddress(
    ID: string,
    addressId: string,
    version: number,
    type: 'shipping' | 'billing',
  ) {
    type AddressIdType = 'addShippingAddressId' | 'addBillingAddressId';
    const action = `add${capitalizeFirstLetter(type)}AddressId` as AddressIdType;

    if (action !== 'addShippingAddressId' && action !== 'addBillingAddressId') return null;

    const actions: CustomerUpdateAction[] = [
      {
        action,
        addressId,
      },
    ];
    const body = {
      version,
      actions,
    };
    let resp;
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

  public async changeAddress(
    newAddress: Address,
    addressId: string,
    ID: string,
    version: number,
  ) {
    let resp;
    const changeAddressAction: MyCustomerChangeAddressAction = {
      action: 'changeAddress',
      addressId,
      address: newAddress,
    };
    const body = {
      version,
      actions: [changeAddressAction],
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

  public async removeAddress(addressId: string, ID: string, version: number) {
    let resp;
    const removeAddressAction: MyCustomerUpdateAction = {
      action: 'removeAddress',
      addressId,
    };
    const body = {
      version,
      actions: [removeAddressAction],
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

  public async setDefaultBillingAddr(
    addressId: string,
    ID: string,
    version: number,
  ) {
    let resp;
    const setDefaultAddressAction: MyCustomerSetDefaultBillingAddressAction = {
      action: 'setDefaultBillingAddress',
      addressId,
    };
    const body = {
      version,
      actions: [setDefaultAddressAction],
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

  public async setDefaultShippingAddr(
    addressId: string,
    ID: string,
    version: number,
  ) {
    let resp;
    const setDefaultAddressAction: MyCustomerSetDefaultShippingAddressAction = {
      action: 'setDefaultShippingAddress',
      addressId,
    };
    const body = {
      version,
      actions: [setDefaultAddressAction],
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

  public async getCarts() {
    let resp;
    try {
      resp = await this.apiRoot?.me().carts().head().execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async getCartList() {
    let resp;
    try {
      resp = await this.apiRoot?.me().carts().get().execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async getActiveCart() {
    let resp;
    try {
      resp = await this.apiRoot?.me().activeCart().get().execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async getCartById(ID: string) {
    if (!ID) return null;

    let resp;
    try {
      resp = await this.apiRoot?.me().carts().withId({ ID }).get()
        .execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async createCart() {
    let resp;
    try {
      resp = await this.apiRoot
        ?.me()
        .carts()
        .post({
          body: { currency: 'EUR' },
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }

  public async removeCart(ID: string, vers: number) {
    this.apiRoot
      ?.me()
      .carts()
      .withId({ ID })
      .delete({ queryArgs: { version: vers } })
      .execute();
  }

  public async addToCart(ID: string, productId: string, version: number) {
    let resp;
    try {
      resp = await this.apiRoot
        ?.me()
        .carts()
        .withId({ ID })
        .post({
          body: {
            version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
    } catch (error) {
      if (error instanceof Error) toastError(error.message);
    }

    return resp;
  }
}

export const currentClient = new ApiBuilder();
