import { LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import BasketItem from './BasketItem.tsx';

function BasketPage() {
  const [cart, setCart] = useState(Array<LineItem>);

  useEffect(() => {
    async function getCartItems() {
      const id = localStorage.getItem('cartId') as string;
      const resp = await currentClient.getCartById(id);

      if (resp) setCart(resp?.body.lineItems);
    }
    getCartItems();
  }, []);

  return (
    <div>
      {cart.length ? (
        cart.map((item) => <BasketItem key={item.id} item={item} />)
      ) : (
        <h1>No items</h1>
      )}
    </div>
  );
}

export default BasketPage;

// 26009c15-fa69-4fd5-89d1-5d4470c2c4e2
