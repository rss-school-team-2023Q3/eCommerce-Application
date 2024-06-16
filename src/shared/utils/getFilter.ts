import { LIMIT_MOBILE } from 'shared/constants';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getFilterProducts(
  filterQuery: string[],
  sortQuery: string,
  searchQuery = '',
  offset: number = 0,
  limit: number = LIMIT_MOBILE,
) {
  return currentClient.getFilterProducts(
    filterQuery,
    sortQuery,
    searchQuery,
    offset,
    limit,
  );
}

export default getFilterProducts;
