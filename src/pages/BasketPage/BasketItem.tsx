import { LineItem } from '@commercetools/platform-sdk';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import './Basket.modules.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from 'shared/api/cartApi/cartSlice';
import { RootState } from 'shared/api/store';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import getCurrentCart from 'shared/utils/getCurrentCart';
import { toastInfo } from 'shared/utils/notifications';

function BasketItem({
  item,
  recalculate,
}: {
  item: LineItem;
  recalculate: () => void;
}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const img = item.variant.images && item.variant.images[0].url;
  const [quantity, setQuantity] = useState(item.quantity);
  const [cost, setCost] = useState(item.totalPrice.centAmount);

  async function changeQuantity(count: number) {
    const cart = await getCurrentCart(isLoggedIn);

    const body = cart?.body;

    if (body) {
      const response = await currentClient.changeItemQuantity(
        body.id,
        body.version,
        item.id,
        count
      );
      const itemResp = response?.body.lineItems.filter(
        (lineItem) => lineItem.id === item.id
      );

      recalculate();
      if (response?.statusCode === 200)
        dispatch(setCart({ cart: response.body }));
      if (itemResp && itemResp.length)
        setCost(itemResp[0].totalPrice.centAmount);
    }
  }

  const handleChangeQuantity = (action: string) => {
    switch (action) {
      case 'up': {
        setQuantity(quantity + 1);
        changeQuantity(quantity + 1);
        break;
      }
      case 'down': {
        if (quantity === 1) {
          toastInfo('Removed from cart');
        }

        setQuantity(quantity - 1);
        changeQuantity(quantity - 1);
        break;
      }
      case 'zero': {
        setQuantity(0);
        changeQuantity(0);
        toastInfo('Removed from cart');
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Card className={quantity > 0 ? 'cart-item' : 'removed'}>
      <CardMedia className="cart-item-img" image={img} title={item.name.en} />
      <CardContent className="cart-item-content">
        <Typography gutterBottom variant="body1" component="div">
          {item.variant.key}
        </Typography>
        <div className="cart-item-data">
          <div className="cart-item-count">
            <ArrowLeftIcon
              className="cart-item-arrow"
              onClick={() => handleChangeQuantity('down')}
            />
            <div className="cart-item-quantity">{quantity}</div>
            <ArrowRightIcon
              className="cart-item-arrow"
              onClick={() => handleChangeQuantity('up')}
            />
          </div>
          <div className="cart-item-cost">
            total: ${(cost / 100).toFixed(2)}
          </div>
          {/* <RemoveShoppingCartIcon />
          <Button onClick={removeFromCart} variant="contained">
            Remove from cart
          </Button> */}
          <Tooltip title="Remove from cart">
            <IconButton onClick={() => handleChangeQuantity('zero')}>
              <RemoveShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

export default BasketItem;
