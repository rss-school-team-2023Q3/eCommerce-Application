import { Product } from '@commercetools/platform-sdk';

function createProduct(productData: Product) {
  return {
    id: productData.id,
    variant: productData.masterData.current.masterVariant,
    name: productData.masterData.current.name,
    description: productData.masterData.current.description,
  };
}

export default createProduct;
