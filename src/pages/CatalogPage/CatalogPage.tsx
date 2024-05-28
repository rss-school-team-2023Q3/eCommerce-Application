import { ProductDiscount } from '@commercetools/platform-sdk';
import IProductData from 'pages/App/types/interfaces/IProductData';
import FilterAside from 'widgets/FilterAside/FilterAside';
import ProductCard from 'widgets/ProductCard/ProductCard';
import './CatalogPage.modules.css';

function CatalogPage({
  products,
  discounts,
}: {
  products: IProductData[];
  discounts: ProductDiscount[];
}) {
  function getDiscont(name: string | undefined) {
    let discont: ProductDiscount | boolean = false;

    discounts.forEach((disc: ProductDiscount) => {
      if (name?.includes(disc.key as string)) {
        discont = disc;
      }
    });

    return discont;
  }

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
