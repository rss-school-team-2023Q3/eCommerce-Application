import {
  Card, CardMedia, CardContent, Typography,
} from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './ProductCard.modules.css';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';

function ProductCard({ product }: { product: IProductData }) {
  const img = product.variant.images && product.variant.images[0].url;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const country = useSelector((state: RootState) => state.auth.user?.country);

  function selectPriceIndex(countryCode: string) {
    if (countryCode === 'US' || countryCode === 'CA') {
      return '$';
    }

    return '€';
  }

  function getPrice(item: IProductData) {
    let price: string | undefined;

    if (isLoggedIn && country) {
      price = item.variant.prices
        && `${selectPriceIndex(country)}${String(
          (
            item.variant.prices.filter((value) => value.country === country)[0].value.centAmount / 100
          ).toFixed(2),
        )}`;
    } else {
      price = `$${
        item.variant.prices
        && String((item.variant.prices[0].value.centAmount / 100).toFixed(2))
      }`;
    }

    return price;
  }

  const price = getPrice(product);

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
        <Typography sx={{ alignSelf: 'flex-end', marginTop: 5 }} variant="h5">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
