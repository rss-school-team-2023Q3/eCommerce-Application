import { Product } from '@commercetools/platform-sdk';
import IClient from 'pages/App/types/interfaces/IClientInterface';
import { useEffect, useState } from 'react';

function CatalogPage({ client }: IClient) {
  let response: Product[] | undefined;
  const [list, setList] = useState(response);
  const fetchData = async () => {
    await client
      .getProducts()
      .then((resp) => resp?.body.results)
      .then((resp) => setList(resp));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Catalog</h1>
      {list}
    </>
  );
}

export default CatalogPage;
