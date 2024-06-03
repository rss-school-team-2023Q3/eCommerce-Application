import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import { setProductsListArray } from './setProductsArray.ts';

async function getProducts(
  filterQuery = '',
  sortQuery = 'masterData.current.name.en asc',
) {
  return currentClient
    .getProducts(filterQuery, sortQuery)
    .then((resp) => resp?.body.results)
    .then((resp) => setProductsListArray(resp));
}

export default getProducts;
