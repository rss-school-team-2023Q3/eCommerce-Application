import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getProducts(
  filterQuery = '',
  sortQuery = 'masterData.current.name.en asc',
  offset: number = 0,
) {
  const res = await currentClient.getProducts(filterQuery, sortQuery, offset);

  return res;
}

export default getProducts;
