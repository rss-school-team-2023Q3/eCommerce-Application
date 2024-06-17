import { Cart } from '@commercetools/platform-sdk';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

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
  const [beforePromoPrice, setBeforePromoPrice] = useState(0);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpenClear, setOpenClear] = useState(false);
  const [isOpenPromo, setOpenPromo] = useState(false);
  const [promocode, setPromocode] = useState('');

  const handleOpenClear = () => {
    setOpenClear(true);
  };

  const handleCloseClear = () => {
    setOpenClear(false);
  };
  const handleOpenPromo = () => {
    setOpenPromo(true);
  };

  const handleClosePromo = () => {
    setOpenPromo(false);
    setPromocode('');
  };

  function setCartPrice(respData: Cart) {
    setTotalPrice(+(respData.totalPrice.centAmount / 100).toFixed(2));
    setBeforePromoPrice(
      respData.discountOnTotalPrice
        ? +(
          (respData.discountOnTotalPrice.discountedAmount.centAmount
              + +respData.totalPrice.centAmount)
            / 100
        ).toFixed(2)
        : 0,
    );
  }

  async function getCartItems() {
    const resp = await getCartData();

    if (resp) {
      dispatch(setCart({ cart: resp }));
      setCartPrice(resp);
    }
  }

  const recalculate = async () => {
    const cartResp = await getCartData();

    if (cartResp) {
      const response = await currentClient.recalculateTotalCost(
        cartResp?.id,
        cartResp?.version,
      );

      if (response) setCartPrice(response.body);
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

  const applyPromocode = async () => {
    const cartData = await getCartData();

    if (cartData) {
      const resp = await currentClient.applyPromocode(
        cartData?.id,
        cartData?.version,
        promocode,
      );

      if (resp?.statusCode === 200) {
        setCartPrice(resp.body);
      }
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="basket-page">
      <Typography className="page-title" variant="h2">
        Basket
      </Typography>
      {cartCart && cartCart.length ? (
        <>
          <div className="basket-header">
            <h3>
              Total cost:&nbsp;
              {beforePromoPrice ? (
                <span
                  style={{
                    color: 'red',
                    fontFamily: 'monospace',
                    fontSize: '20px',
                    fontWeight: 600,
                    textDecorationLine: 'line-through',
                  }}
                >
                  $
                  {beforePromoPrice}
                </span>
              ) : (
                ''
              )}
              &nbsp;
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                $
                {totalPrice}
              </span>
            </h3>
            <div className="basket-header-buttons">
              <Button
                sx={{ marginRight: '5px' }}
                onClick={handleOpenPromo}
                variant="contained"
              >
                Apply Promo
              </Button>
              <Dialog
                open={isOpenPromo}
                onClose={handleClosePromo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Do you have Promo?
                </DialogTitle>
                <TextField
                  color="success"
                  focused
                  sx={{ margin: '10px' }}
                  value={promocode}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPromocode(event.target.value);
                  }}
                />
                <DialogActions>
                  <Button sx={{ margin: '10px' }} onClick={handleClosePromo}>
                    Close
                  </Button>
                  <Button
                    sx={{ margin: '10px' }}
                    onClick={() => {
                      handleClosePromo();
                      applyPromocode();
                    }}
                    autoFocus
                  >
                    Apply promo
                  </Button>
                </DialogActions>
              </Dialog>
              <Button onClick={handleOpenClear} variant="contained">
                Clear Basket
              </Button>
              <Dialog
                open={isOpenClear}
                onClose={handleCloseClear}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Clear cart?</DialogTitle>
                <DialogActions>
                  <Button sx={{ margin: '10px' }} onClick={handleCloseClear}>
                    No
                  </Button>
                  <Button
                    sx={{ margin: '10px' }}
                    onClick={() => {
                      handleCloseClear();
                      clearCart();
                    }}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          {cartCart.map((item) => (
            <BasketItem key={item.id} item={item} recalculate={recalculate} />
          ))}
        </>
      ) : (
        <>
          <Typography
            className="no-item"
            fontFamily="Montserrat, sans-serif"
            variant="h4"
          >
            No items...
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ width: '250px' }}
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
