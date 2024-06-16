import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button, Dialog, DialogActions, DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from 'shared/api/cartApi/cartSlice.ts';
import { RootState } from 'shared/api/store.ts';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import getCartData from 'shared/utils/getCartData.ts';

import BasketItem from './BasketItem.tsx';

function BasketPage() {
  const cartCart = useSelector(
    (state: RootState) => state.cart.cart?.lineItems,
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenConfirm = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  async function getCartItems() {
    const resp = await getCartData();

    if (resp) {
      dispatch(setCart({ cart: resp }));
      setTotalPrice(+(resp.totalPrice.centAmount / 100).toFixed(2));
    }
  }

  const recalculate = async () => {
    const cartResp = await getCartData();

    if (cartResp) {
      const response = await currentClient.recalculateTotalCost(
        cartResp?.id,
        cartResp?.version,
      );

      setTotalPrice(
        response ? +(response.body.totalPrice.centAmount / 100).toFixed(2) : 0,
      );
    }
  };

  const clearCart = async () => {
    const removedCartData = await getCartData();

    if (removedCartData) {
      await currentClient.removeCart(
        removedCartData?.id,
        removedCartData.version,
      );
    }

    await currentClient.createCart().then((resp) => {
      localStorage.setItem('cartId', resp?.body.id as string);

      if (resp?.statusCode === 201) {
        dispatch(setCart({ cart: resp.body }));
      }
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="basket-page">
      {cartCart && cartCart.length ? (
        <>
          <div className="basket-header">
            <h3>
              Total cost: $
              {totalPrice}
            </h3>
            <Button onClick={handleOpenConfirm} variant="contained">
              Clear Basket
            </Button>
            <Dialog
              open={isOpenModal}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Clear cart?</DialogTitle>

              <DialogActions>
                <Button sx={{ margin: '10px' }} onClick={handleClose}>
                  No
                </Button>
                <Button
                  sx={{ margin: '10px' }}
                  onClick={() => {
                    handleClose();
                    clearCart();
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {cartCart.map((item) => (
            <BasketItem key={item.id} item={item} recalculate={recalculate} />
          ))}
        </>
      ) : (
        <>
          <h1>No items</h1>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ width: '300px' }}
            onClick={() => navigate('/catalog')}
            variant="contained"
          >
            Back to catalog
          </Button>
        </>
      )}
    </div>
  );
}

export default BasketPage;
