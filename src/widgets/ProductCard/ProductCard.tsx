import {
  Card, CardMedia, CardContent, Typography,
} from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './ProductCard.modules.css';

function ProductCard({ product }: { product: IProductData }) {
  const img = product.variant.images && product.variant.images[0].url;

  return (
    <Card className="card">
      <CardMedia className="card-img" sx={{ height: 345 }} image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.variant.key}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description
            && `${product.description.en}: ${product.name.en}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
