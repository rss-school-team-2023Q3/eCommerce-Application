import { Button } from '@mui/material';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

function BasketPage() {
  return (
    <div>
      <h1>No items</h1>
      <Button
        onClick={() => currentClient.removeCart('e2108d8f-b321-43dd-99a5-6c1d8a415353', 1)}
      >
        Remove
      </Button>
    </div>
  );
}

export default BasketPage;

// 26009c15-fa69-4fd5-89d1-5d4470c2c4e2
