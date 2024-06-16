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
// import ClearCartModal from './ClearCartModal.tsx';

function BasketPage() {
  const cartCart = useSelector(
    (state: RootState) => state.cart.cart?.lineItems,
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpenClear, setOpenClear] = useState(false);
  const [isOpenPromo, setOpenPromo] = useState(false);
  const [name, setName] = useState('');

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
              Total cost:&nbsp;
              <span
                style={{
                  color: 'black',
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
              <Button onClick={handleOpenPromo} variant="contained">
                Clear Basket
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
                  value={name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
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
                      clearCart();
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
            fontFamily="Montserrat, sans-serif"
            variant="h4"
            fontWeight={500}
            color="lightgrey"
            marginBottom={5}
            marginTop={5}
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
