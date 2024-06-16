import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getCartData() {
  let resp;
  const id: string | null = localStorage.getItem('cartId');

  if (!localStorage.getItem('tokenCacheGG') && id) {
    resp = await currentClient.getCartById(id);
  } else {
    resp = await currentClient.getActiveCart();
  }

  return resp?.body;
}

export default getCartData;
