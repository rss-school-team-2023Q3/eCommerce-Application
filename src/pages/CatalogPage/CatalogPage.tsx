import { ProductDiscount } from '@commercetools/platform-sdk';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './CatalogPage.modules.css';
import { useEffect, useState } from 'react';
// import { currentClient } from 'shared/libs/commercetools/apiBuilder';
// import setProductsArray from 'shared/utils/setProductsArray';
import getDiscounts from 'shared/utils/getDiscounts';
import getProducts from 'shared/utils/getProducts';
import FilterAside from 'widgets/FilterAside/FilterAside';
import ProductCard from 'widgets/ProductCard/ProductCard';
// import catalogContext from './catalogContext';

function CatalogPage() {
  const productsList: IProductData[] = [];
  const discountsList: ProductDiscount[] = [];
  const [products, setProducts] = useState(productsList);
  const [discounts, setDiscounts] = useState(discountsList);
  // const catalogFilterData = useContext(catalogContext);

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
      setProducts(await getProducts());

      setDiscounts(await getDiscounts());
      // .then((resp) => (resp ? setDiscounts(resp) : '')))
    };

    if (!products.length) {
      fetchData();
    }
  }, [products]);

  return (
    <div className="catalog-page">
      {/* <catalogContext.Provider value={catalogFilterData}> */}
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
      {/* </catalogContext.Provider> */}
    </div>
  );
}

export default CatalogPage;
