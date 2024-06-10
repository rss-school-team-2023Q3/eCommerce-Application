import { LineItem } from '@commercetools/platform-sdk';
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
      <CardMedia className="cart-img" image={img} title={item.name.en} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.variant.key}
        </Typography>
      </CardContent>
      {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
}

export default BasketItem;
