import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

export default async function getCurrentCart(
  isLoggedIn: boolean,
): Promise<ClientResponse<Cart> | null | undefined> {
  const id = localStorage.getItem('cartId') as string;
  let cartRes;

  if (isLoggedIn) {
    cartRes = await currentClient.getActiveCart();
  } else {
    cartRes = await currentClient.getCartById(id);
  }

  return cartRes;
}
