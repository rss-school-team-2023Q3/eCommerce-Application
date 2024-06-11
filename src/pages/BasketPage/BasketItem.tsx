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

function BasketItem({ item }: { item: LineItem }) {
  const img = item.variant.images && item.variant.images[0].url;

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
            <ArrowLeftIcon />
            <div>{item.quantity}</div>
            <ArrowRightIcon />
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
