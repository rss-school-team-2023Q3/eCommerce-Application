import { LocalizedString, ProductVariant } from '@commercetools/platform-sdk';

interface IProductData {
  variant: ProductVariant;
  name: LocalizedString;
  description: LocalizedString | undefined;
}

export default IProductData;
