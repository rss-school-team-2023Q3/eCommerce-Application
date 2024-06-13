import { Cart, Product, TypedMoney } from '@commercetools/platform-sdk';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import IProductData from 'pages/App/types/interfaces/IProductData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from 'shared/api/store';
import CarouselComponent from 'shared/components/CarouselComponent/CarouselComponent';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import addToCart from 'shared/utils/addToCart';
import createProduct from 'shared/utils/createProduct';
import getCurrentCart from 'shared/utils/getCurrentCart';
import removeFromCart from 'shared/utils/removeFromCart';

import './Product.modules.css';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Product | null>(null);
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const isMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartStore: Cart | null = useSelector(
    (state: RootState) => state.cart.cart,
  );
  const [cart, setCart] = useState<Cart | null>(null);
  // const [isInCart, setIsInCart] = useState(false);

  const country = useSelector(
    (state: RootState) => state.auth.user?.addresses[0].country,
  );
  const product = productData && createProduct(productData);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const setProductPrice = (item: IProductData) => {
    const price: {
      fullPrice: string | undefined | null;
      discountPrice: string | undefined | null;
    } = {
      fullPrice: '',
      discountPrice: '',
    };

    const currentCountry = item.variant.prices?.find(
      (value) => value.country === country,
    );

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency:
        country === 'US' || country === 'CA' || country == null ? 'USD' : 'EUR',
    });

    const getPrice = (priceData: TypedMoney | undefined) => {
      if (!priceData) return null;

      const amount = priceData.centAmount / 100;

      return formatter.format(amount);
    };

    if (isLoggedIn && country) {
      price.fullPrice = getPrice(currentCountry?.value);
      price.discountPrice = getPrice(currentCountry?.discounted?.value);
    } else if (item.variant.prices) {
      price.fullPrice = getPrice(item.variant.prices[0]?.value);
      price.discountPrice = getPrice(item.variant.prices[0]?.discounted?.value);
    }

    return price;
  };

  const renderImages = () => {
    if (!product?.variant.images) return null;

    if (product?.variant.images.length === 1) {
      return (
        <button
          type="button"
          key={product?.variant.images[0].url}
          onClick={handleClickOpen}
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          <img
            src={product?.variant.images[0].url}
            alt={product?.variant.key}
            style={{ width: '100%', maxWidth: '400px' }}
          />
        </button>
      );
    }

    return (
      <CarouselComponent
        images={product.variant.images}
        alt={product.variant.key}
      />
    );
  };

  const price = product && setProductPrice(product);
  const fullPrice = price ? price.fullPrice : null;
  const discountPrice = price ? price.discountPrice : null;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const data = await currentClient
        .getProduct(id)
        .then((resp) => resp?.body)
        .catch(() => {
          navigate('/404');
        });

      if (!data) return;

      setProductData(data);
    };

    setTimeout(fetchProduct, 0);
  }, [id]);

  useEffect(() => {
    setCart(cartStore);
  }, [cartStore?.lineItems.length]);

  useEffect(() => {
    const fun = async () => {
      const cartResponse = await getCurrentCart(isLoggedIn);

      if (cartResponse?.statusCode === 200) setCart(cartResponse.body);
    };

    fun();
  }, []);

  return (
    <div>
      <div className="card-top">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/catalog')}
          variant="contained"
        >
          Back to catalog
        </Button>

        {!(cart?.lineItems.find((el) => el.productId === id) ?? false) && (
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            aria-label="add in cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(id as string, isLoggedIn, dispatch);
            }}
          >
            Add to basket
          </Button>
        )}
        {!!(cart?.lineItems.find((el) => el.productId === id) ?? false) && (
          <Button
            variant="contained"
            startIcon={<RemoveShoppingCartIcon />}
            // className="card-cart"
            aria-label="remove from cart"
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(id as string, isLoggedIn, dispatch);
            }}
          >
            Remove from cart
          </Button>
        )}
      </div>

      {product && product.variant.images && (
        <Grid
          container
          mt={4}
          spacing={2}
          alignItems="center"
          direction={isMatches ? 'row' : 'column'}
          maxWidth={900}
        >
          <Grid item xs={12} sm={5} minWidth={200}>
            {renderImages()}
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h4" component="h1" mb={4}>
              {product.variant.key}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
              mb={5}
            >
              {product.description?.en}
              :
              {product.variant.key}
            </Typography>
            <div className="card-price">
              <Typography
                sx={{
                  textDecorationLine: discountPrice ? 'line-through' : 'none',
                }}
                variant="h5"
              >
                {fullPrice}
              </Typography>
              {discountPrice ? (
                <Typography variant="h5" color="red">
                  {discountPrice}
                </Typography>
              ) : (
                ''
              )}
            </div>
          </Grid>
        </Grid>
      )}
      <Dialog open={isModalOpen} onClose={handleClose} fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{
              position: 'absolute',
              right: '20px',
              top: '10px',
              zIndex: '500',
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={product?.variant.images && product?.variant.images[0].url}
            alt={product?.variant.key}
            style={{ width: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductPage;
