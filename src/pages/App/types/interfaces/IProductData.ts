import { LocalizedString, ProductVariant } from '@commercetools/platform-sdk';

interface IProductData {
  id: string;
  variant: ProductVariant;
  name: LocalizedString;
  description: LocalizedString | undefined;
}

export default IProductData;
