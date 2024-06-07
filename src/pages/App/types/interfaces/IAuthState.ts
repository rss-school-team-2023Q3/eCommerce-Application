import { Customer } from '@commercetools/platform-sdk';

interface IAuthState {
  isLoggedIn: boolean;
  isLoading?: boolean;
  user: Customer | null;
  token?: string | null;
}

export default IAuthState;
