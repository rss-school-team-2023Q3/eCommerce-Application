import IUser from 'pages/App/types/interfaces/IUser';

interface IAuthState {
  isLoggedIn: boolean;
  isLoading?: boolean;
  user: IUser | null;
  token: string | null;
}

export default IAuthState;
