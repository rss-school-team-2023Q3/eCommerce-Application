import { LIMIT_MOBILE } from 'shared/constants';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getProducts(
  filterQuery = '',
  sortQuery = 'masterData.current.name.en asc',
  offset: number = 0,
  limit: number = LIMIT_MOBILE
) {
  const res = await currentClient.getProducts(
    filterQuery,
    sortQuery,
    offset,
    limit
  );

  return res;
}

export default getProducts;
