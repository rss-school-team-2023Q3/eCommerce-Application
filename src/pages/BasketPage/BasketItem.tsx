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
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import { toastInfo } from 'shared/utils/notifications';

function BasketItem({ item }: { item: LineItem }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const id = localStorage.getItem('cartId') as string;
  const img = item.variant.images && item.variant.images[0].url;
  const [quantity, setQuantity] = useState(item.quantity);
  const [cost, setCost] = useState(item.totalPrice.centAmount);

  async function changeQuantity(count: number) {
    let cart;

    if (isLoggedIn) {
      cart = await currentClient.getActiveCart();
    } else {
      cart = await currentClient.getCartById(id);
    }

    const body = cart?.body;

    if (body) {
      const response = await currentClient.changeItemQuantity(
        body.id,
        body.version,
        item.id,
        count,
      );
      const itemResp = response?.body.lineItems.filter(
        (lineItem) => lineItem.id === item.id,
      );

      if (itemResp && itemResp.length) setCost(itemResp[0].totalPrice.centAmount);
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
        if (quantity !== 1) {
          setQuantity(quantity - 1);
          changeQuantity(quantity - 1);
        } else {
          setQuantity(quantity - 1);
          changeQuantity(quantity - 1);
          toastInfo('removed from cart');
        }

        break;
      }
      default: {
        break;
      }
    }
  };

  const removeFromCart = () => {
    setQuantity(0);
    changeQuantity(0);
    toastInfo('removed from cart');
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
            total: $
            {(cost / 100).toFixed(2)}
          </div>
          {/* <RemoveShoppingCartIcon />
          <Button onClick={removeFromCart} variant="contained">
            Remove from cart
          </Button> */}
          <Tooltip title="Remove from cart">
            <IconButton onClick={removeFromCart}>
              <RemoveShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

export default BasketItem;
