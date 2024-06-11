import { LineItem } from '@commercetools/platform-sdk';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  // CardActions,
  // Button,
} from '@mui/material';
import './Basket.modules.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import { toastError } from 'shared/utils/notifications';

function BasketItem({ item }: { item: LineItem }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const id = localStorage.getItem('cartId') as string;
  const img = item.variant.images && item.variant.images[0].url;
  const [quantity, setQuantity] = useState(item.quantity);

  async function changeQuantity(count: number) {
    if (isLoggedIn) {
      const cart = await currentClient.getActiveCart();
      const body = cart?.body;

      if (body) currentClient.changeItemQuantity(body.id, body.version, item.id, count);
    } else {
      const cart = await currentClient.getCartById(id);
      const body = cart?.body;

      if (body) currentClient.changeItemQuantity(body.id, body.version, item.id, count);
    }
  }

  function handleChangeQuantity(action: string) {
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
          toastError('poka net');
        }

        break;
      }
      default: {
        break;
      }
    }
  }

  // console.log(item);

  return (
    <Card className="cart-item">
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
            {(item.totalPrice.centAmount / 100).toFixed(2)}
          </div>
        </div>
      </CardContent>
      {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
}

export default BasketItem;
