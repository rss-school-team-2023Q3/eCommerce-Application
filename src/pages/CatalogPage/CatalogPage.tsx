import { ProductDiscount } from '@commercetools/platform-sdk';
import { Divider, useMediaQuery } from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './CatalogPage.modules.css';
import { useEffect, useState } from 'react';
import { Paginator } from 'shared/components/Paginator/Paginator';
import { LIMIT_LARGE, LIMIT_TABLET, LIMIT_MOBILE } from 'shared/constants';
import getDiscounts from 'shared/utils/getDiscounts';
import getProducts from 'shared/utils/getProducts';
import { setProductsListArray } from 'shared/utils/setProductsArray';
import FilterAside from 'widgets/FilterAside/FilterAside';
import Loader from 'widgets/Loader/Loader';
import ProductCard from 'widgets/ProductCard/ProductCard';

function CatalogPage() {
  let mediaQueryLimit = LIMIT_MOBILE;
  const isLargeScreen = useMediaQuery('(min-width: 1174px)');
  const isTabletScreen = useMediaQuery('(min-width: 890px)');

  const isMobileScreen = useMediaQuery('(min-width: 580px)');

  if (isTabletScreen) mediaQueryLimit = LIMIT_TABLET;

  if (isLargeScreen) mediaQueryLimit = LIMIT_LARGE;

  const productsList: IProductData[] = [];
  const discountsList: ProductDiscount[] = [];
  const [products, setProducts] = useState(productsList);
  const [discounts, setDiscounts] = useState(discountsList);
  const [isLoad, setIsLoad] = useState(true);
  // const [isInCart, setIsInCart] = useState(false);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(mediaQueryLimit);

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
      const res = await getProducts(
        '',
        'masterData.current.name.en asc',
        0,
        mediaQueryLimit,
      );

      setProducts(setProductsListArray(res?.body.results));
      setDiscounts(await getDiscounts());
      setIsLoad(false);
      setPageQty(
        Math.ceil((res?.body.total ?? mediaQueryLimit) / mediaQueryLimit),
      );
    }, 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const paginator: Element | null = document.querySelector('.paginator');

      if (paginator) {
        paginator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }, [products[0], mediaQueryLimit]);

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 200);
  }, [mediaQueryLimit]);

  useEffect(() => {
    setTimeout(() => {
      const paginator: Element | null = document.querySelector('.paginator');

      if (paginator) {
        paginator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }, [isMobileScreen]);

  return (
    <div className="catalog-page">
      <FilterAside
        props={{
          filteredList,
          setLoadState,
          offset: (page - 1) * mediaQueryLimit,
          setTotal: setPageQty,
        }}
      />
      <Divider orientation="vertical" flexItem />
      <div className="card-paginator-wrap">
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
                  />
                );
              });
            }

            return (
              <h2 style={{ alignSelf: 'center', width: '100%' }}>No items</h2>
            );
          })()}
        </div>
        {!!products.length && (
          <div className="paginator">
            <Paginator pageQty={pageQty} page={page} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;
