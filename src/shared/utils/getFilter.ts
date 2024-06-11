import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getFilterProducts(
  filterQuery: string[],
  sortQuery: string,
  searchQuery = '',
  offset: number = 0,
) {
  return currentClient.getFilterProducts(
    filterQuery,
    sortQuery,
    searchQuery,
    offset,
  );
}

export default getFilterProducts;
