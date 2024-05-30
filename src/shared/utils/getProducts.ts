import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import setProductsArray from './setProductsArray.ts';

async function getProducts(request: string) {
  return currentClient
    .getProducts(request)
    .then((resp) => resp?.body.results)
    .then((resp) => setProductsArray(resp));
}

export default getProducts;
