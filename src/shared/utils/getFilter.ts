import { ProductProjection } from '@commercetools/platform-sdk';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import { setProductsProjectionArray } from './setProductsArray.ts';

async function getFilterProducts(
  filterQuery: string[],
  sortQuery = 'price asc',
  searchQuery = ''
) {
  return currentClient
    .getFilterProducts(filterQuery, sortQuery, searchQuery)
    .then((resp) => resp?.body.results)
    .then((resp) => resp)
    .then((resp) => setProductsProjectionArray(resp as ProductProjection[]));
}

export default getFilterProducts;
