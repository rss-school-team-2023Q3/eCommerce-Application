import { Dispatch } from '@reduxjs/toolkit';
import { setCart } from 'shared/api/cartApi/cartSlice.ts';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import getCurrentCart from './getCurrentCart.ts';
import { toastInfo } from './notifications.ts';

export default async function removeFromCart(
  productId: string,
  isLoggedIn: boolean,
  dispatch: Dispatch,
) {
  const cart = await getCurrentCart(isLoggedIn);

  const body = cart?.body;

  if (body) {
    const lineItemId: string | undefined = body.lineItems.find(
      (lineItem) => lineItem.productId === productId,
    )?.id;

    if (lineItemId) {
      const res = await currentClient.removeItemCart(
        body.id,
        body.version,
        lineItemId,
      );

      if (res?.statusCode === 200) {
        dispatch(setCart({ cart: res.body }));

        const name = cart.body.lineItems.find((el) => el.id === lineItemId)?.name.en || '';

        toastInfo(`${name} remove from cart`);
      }
    }
  }
}
