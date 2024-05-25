import IClient from 'pages/App/types/interfaces/IClientInterface';
import IProductData from 'pages/App/types/interfaces/IProductData';
import ProductListType from 'pages/App/types/types/ProductListType';
import { useEffect, useState } from 'react';
import ProductCard from 'widgets/ProductCard/ProductCard';
import './CatalogPage.modules.css';

function CatalogPage({ client }: IClient) {
  const productsList: IProductData[] = [];
  const [products, setProducts] = useState(productsList);

  function setProductsArray(list: ProductListType) {
    const newProducts: IProductData[] = [];

    list?.forEach((item) => {
      newProducts.push({
        variant: item.masterData.current.masterVariant,
        name: item.masterData.current.name,
        description: item.masterData.current.description,
      });
      item.masterData.current.variants.forEach((variant) => {
        newProducts.push({
          variant,
          name: item.masterData.current.name,
          description: item.masterData.current.description,
        });
      });
    });
    setProducts(newProducts);
  }

  async function fetchData() {
    await client
      .getProducts()
      .then((resp) => resp?.body.results)
      .then((resp) => setProductsArray(resp));
  }

  useEffect(() => {
    fetchData();
  }, []);

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
