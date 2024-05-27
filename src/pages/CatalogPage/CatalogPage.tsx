import IProductData from 'pages/App/types/interfaces/IProductData';
import ProductCard from 'widgets/ProductCard/ProductCard';
import './CatalogPage.modules.css';

function CatalogPage({ products }: { products: IProductData[] }) {
  return (
    <>
      <h1>Catalog</h1>
      <div className="catalog">
        {products.map((item) => (
          <ProductCard key={item.variant.key} product={item} />
        ))}
      </div>
    </>
  );
}

export default CatalogPage;
