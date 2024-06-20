import { Cart } from '@commercetools/platform-sdk';
import { Box, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import EmptyCartView from 'widgets/EmptyCartView/EmptyCartView';
import './ModalCart.modules.css';

export default function ModalCart() {
  const cartStore: Cart | null = useSelector(
    (state: RootState) => state.cart.cart,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isPrevState, setIsPrevState] = useState(false);

  useEffect(() => {
    if (!cartStore?.lineItems || !isPrevState) return;

    if (cartStore?.lineItems.length === 0) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [cartStore?.lineItems.length]);

  useEffect(() => {
    setTimeout(() => {
      setIsPrevState(true);
    }, 1500);
  }, []);

  return (
    <Modal
      open={isOpen}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography className="bg-cart-title" variant="h6" component="h2">
          Your cart is empty
        </Typography>
        <EmptyCartView />
      </Box>
    </Modal>
  );
}
