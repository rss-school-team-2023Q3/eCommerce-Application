import { ProductProjection } from '@commercetools/platform-sdk';
import IProductData from 'pages/App/types/interfaces/IProductData';
import ProductListType from 'pages/App/types/types/ProductListType';

import createProduct from './createProduct.ts';

export function setProductsListArray(list: ProductListType) {
  const newProducts: IProductData[] = [];

  list?.forEach((item) => {
    newProducts.push(createProduct(item));
    // variant: item.masterData.current.masterVariant,
    // name: item.masterData.current.name,
    // description: item.masterData.current.description,
  });

  return newProducts;
}

export function setProductsProjectionArray(list: ProductProjection[]) {
  const newProducts: IProductData[] = [];

  list?.forEach((item) => {
    newProducts.push({
      variant: item.masterVariant,
      name: item.name,
      description: item.description,
    });
  });

  return newProducts;
}