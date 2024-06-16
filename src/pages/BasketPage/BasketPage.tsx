import { LineItem } from '@commercetools/platform-sdk';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import BasketItem from './BasketItem.tsx';
// import { Button } from '@mui/material';

function BasketPage() {
  const [cart, setCart] = useState(Array<LineItem>);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function getCartItems() {
      let resp;

      if (!localStorage.getItem('tokenCacheGG')) {
        const id = localStorage.getItem('cartId') as string;

        resp = await currentClient.getCartById(id);
      } else {
        resp = await currentClient.getActiveCart();
      }

      if (resp) {
        setCart(resp.body.lineItems);
        setTotalPrice(+(resp.body.totalPrice.centAmount / 100).toFixed(2));
      }
    }
    getCartItems();
  }, []);

  const recalculate = async () => {
    const cartResp = await currentClient
      .getActiveCart()
      .then((resp) => resp?.body);

    if (cartResp) {
      const response = await currentClient.recalculateTotalCost(
        cartResp?.id,
        cartResp?.version
      );

      setTotalPrice(
        response ? +(response.body.totalPrice.centAmount / 100).toFixed(2) : 0
      );
    }
  };

  return (
    <>
      <div className="basket-header">
        <h3>
          Total items:&nbsp; 0
        </h3>
        <h3>Total cost: ${totalPrice}</h3>
        <Button variant="contained">Clear Basket</Button>
      </div>
      <div className="basket-page">
        {cart.length ? (
          cart.map((item) => (
            <BasketItem key={item.id} item={item} recalculate={recalculate} />
          ))
        ) : (
          <Grid container justifyContent="center">
            <Typography
              fontFamily="Montserrat, sans-serif"
              fontWeight={500}
              variant="h4"
              color="lightgrey"
              marginTop={10}
            >
              No items
            </Typography>
          </Grid>
        )}
        {/* <Button
        onClick={() =>
          currentClient.removeCart('feae7df9-e360-4e6a-aac4-aa3758b334dd', 9)
        }
        >
        Remove
      </Button> */}
      </div>
    </>
  );
}

export default BasketPage;
