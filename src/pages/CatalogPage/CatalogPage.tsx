import { ProductDiscount } from '@commercetools/platform-sdk';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './CatalogPage.modules.css';
import { useEffect, useState } from 'react';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import setProductsArray from 'shared/utils/setProductsArray';
import FilterAside from 'widgets/FilterAside/FilterAside';
import ProductCard from 'widgets/ProductCard/ProductCard';

function CatalogPage() {
  const productsList: IProductData[] = [];
  const discountsList: ProductDiscount[] = [];
  const [products, setProducts] = useState(productsList);
  const [discounts, setDiscounts] = useState(discountsList);

  function getDiscont(name: string | undefined) {
    let discont: ProductDiscount | boolean = false;

    discounts.forEach((disc: ProductDiscount) => {
      if (name?.includes(disc.key as string)) {
        discont = disc;
      }
    });

    return discont;
  }
  useEffect(() => {
    const fetchData = async () => {
      await currentClient
        .getProducts()
        .then((resp) => resp?.body.results)
        .then((resp) => setProducts(setProductsArray(resp)));

      await currentClient
        .getProductsDiscount()
        .then((resp) => resp?.body.results)
        .then((resp) => setDiscounts(resp as ProductDiscount[]));
    };

    if (!products.length) {
      fetchData();
    }
  }, [products]);

  return (
    <div className="catalog-page">
      {/* <TextField
          autoComplete="off"
          type="Text"
          // onChange={(e) => checkCity(e.target.value)}
          label="Search"
          color="primary"
        /> */}
      <FilterAside />
      <div className="catalog">
        {products.map((item) => {
          const isDiscont = getDiscont(item.variant.sku);

          return (
            <ProductCard
              key={item.variant.key}
              product={item}
              discount={isDiscont}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CatalogPage;
