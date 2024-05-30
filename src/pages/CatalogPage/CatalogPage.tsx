import { ProductDiscount } from '@commercetools/platform-sdk';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './CatalogPage.modules.css';
import { useEffect, useState } from 'react';
import getDiscounts from 'shared/utils/getDiscounts';
import getProducts from 'shared/utils/getProducts';
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
      setProducts(await getProducts(''));
      setDiscounts(await getDiscounts());
    };

    if (!products.length) {
      fetchData();
    }
  }, [products]);

  return (
    <div className="catalog-page">
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
