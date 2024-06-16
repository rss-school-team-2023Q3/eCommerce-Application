import { Dispatch } from '@reduxjs/toolkit';
import { setCart } from 'shared/api/cartApi/cartSlice.ts';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import getCurrentCart from './getCurrentCart.ts';
import { toastInfo } from './notifications.ts';

export default async function addToCart(
  productId: string,
  isLoggedIn: boolean,
  dispatch: Dispatch
) {
  const cart = await getCurrentCart(isLoggedIn);

  const res = await currentClient.addToCart(
    cart?.body.id as string,
    productId,
    cart?.body.version as number
  );

  if (res?.statusCode === 200) {
    dispatch(setCart({ cart: res.body }));

    const name =
      res?.body.lineItems.find((el) => el.productId === productId)?.name.en ||
      '';

    toastInfo(`${name} added to cart`);
  }
}
