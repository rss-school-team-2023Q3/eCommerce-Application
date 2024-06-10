import { LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import BasketItem from './BasketItem.tsx';
// import { Button } from '@mui/material';

function BasketPage() {
  const [cart, setCart] = useState(Array<LineItem>);

  useEffect(() => {
    async function getCartItems() {
      let resp;

      if (!localStorage.getItem('tokenCacheGG')) {
        const id = localStorage.getItem('cartId') as string;

        resp = await currentClient.getCartById(id);
      } else {
        resp = await currentClient.getActiveCart();
      }

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
      {/* <Button
        onClick={() =>
          currentClient.removeCart('feae7df9-e360-4e6a-aac4-aa3758b334dd', 9)
        }
      >
        Remove
      </Button> */}
    </div>
  );
}

export default BasketPage;
