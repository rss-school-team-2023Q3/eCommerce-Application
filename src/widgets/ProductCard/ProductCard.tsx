import {
  ProductDiscount,
  ProductDiscountValueRelative,
} from '@commercetools/platform-sdk';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import './ProductCard.modules.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'shared/api/store';
import selectPriceIndex from 'shared/utils/selectPriceIndex';

function ProductCard({
  product,
  discount,
}: {
  product: IProductData;
  discount: ProductDiscount | boolean;
}) {
  const img = product.variant.images && product.variant.images[0].url;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const country = useSelector(
    (state: RootState) => state.auth.user?.addresses[0].country,
  );
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);

  function getPrice(item: IProductData) {
    let price: string | undefined;

    if (isLoggedIn && country) {
      price = item.variant.prices
        && `${selectPriceIndex(country)}${String(
          (
            item.variant.prices.filter((value) => value.country === country)[0]
              .value.centAmount / 100
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

  function getDiscountPrice(price: string | undefined) {
    if (!discount) {
      return false;
    }

    if (typeof discount !== 'boolean' && price) {
      const discountAmount = +(discount.value as ProductDiscountValueRelative).permyriad / 100;
      const moneyIndex = price.slice(0, 1);

      return `${moneyIndex}${String((+price.slice(1) - +price.slice(1) * (discountAmount / 100)).toFixed(2))}`;
    }

    return false;
  }

  function handleProductClick(productId: string | undefined) {
    navigate(`/product/${productId}`);
  }

  const price = getPrice(product);
  const discountPrice = getDiscountPrice(price);

  return (
    <Card className="card" onClick={() => handleProductClick(product.id)}>
      <CardMedia className="card-img" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.variant.key}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description
            && `${product.description.en}: ${product.name.en}`}
        </Typography>
        <div className="card-bottom">
          {!isInCart && (
            <IconButton
              className="card-cart"
              aria-label="add in cart"
              onClick={(e) => {
                e.stopPropagation();
                setIsInCart(true);
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
          {isInCart && (
            <IconButton
              className="card-cart"
              aria-label="remove from cart"
              onClick={(e) => {
                e.stopPropagation();
                setIsInCart(false);
              }}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          )}
          <div className="card-price">
            <Typography
              sx={{
                textDecorationLine: discountPrice ? 'line-through' : 'none',
              }}
              variant="h5"
            >
              {price}
            </Typography>
            {discountPrice ? (
              <Typography variant="h5" color="red">
                {discountPrice}
              </Typography>
            ) : (
              ''
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
