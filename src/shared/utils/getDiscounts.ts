import { ProductDiscount } from '@commercetools/platform-sdk';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

async function getDiscounts() {
  return (await currentClient
    .getProductsDiscount()
    .then((resp) => resp?.body.results)) as ProductDiscount[];
}

export default getDiscounts;
