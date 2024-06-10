import { ProductDiscount } from '@commercetools/platform-sdk';
import { Divider } from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './CatalogPage.modules.css';
import { useEffect, useState } from 'react';
import { Paginator } from 'shared/components/Paginator/Paginator';
import getDiscounts from 'shared/utils/getDiscounts';
import getProducts from 'shared/utils/getProducts';
import FilterAside from 'widgets/FilterAside/FilterAside';
import Loader from 'widgets/Loader/Loader';
import ProductCard from 'widgets/ProductCard/ProductCard';

function CatalogPage() {
  const productsList: IProductData[] = [];
  const discountsList: ProductDiscount[] = [];
  const [products, setProducts] = useState(productsList);
  const [discounts, setDiscounts] = useState(discountsList);
  const [isLoad, setIsLoad] = useState(true);
  // const [isInCart, setIsInCart] = useState(false);
  const [page, setPage] = useState(1);

  function getDiscont(name: string | undefined) {
    let discont: ProductDiscount | boolean = false;

    discounts.forEach((disc: ProductDiscount) => {
      if (name?.includes(disc.key as string)) {
        discont = disc;
      }
    });

    return discont;
  }

  const filteredList = (productArray: IProductData[]) => {
    setProducts(productArray);
  };

  const setLoadState = (state: boolean) => {
    setIsLoad(state);
  };

  const fetchData = async () => {
    setTimeout(async () => {
      setProducts(await getProducts(''));
      setDiscounts(await getDiscounts());
      setIsLoad(false);
    }, 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="catalog-page">
      <FilterAside props={{ filteredList, setLoadState }} />
      <Divider orientation="vertical" flexItem />
      <div className="catalog">
        {(() => {
          if (isLoad) {
            return <Loader />;
          }

          if (products.length) {
            return products.map((item) => {
              const isDiscont = getDiscont(item.variant.sku);

              return (
                <ProductCard
                  key={item.variant.key}
                  product={item}
                  discount={isDiscont}
                  // isInCart={isInCart}
                />
              );
            });
          }

          return (
            <h2 style={{ alignSelf: 'center', width: '100%' }}>No items</h2>
          );
        })()}
        <Paginator pageQty={products.length} page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default CatalogPage;
