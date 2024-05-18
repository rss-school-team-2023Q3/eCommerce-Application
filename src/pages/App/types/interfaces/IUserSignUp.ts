import IUserAddress from 'pages/App/types/types/IUserAddress';

interface IUserSignUp {
  addresses: IUserAddress[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: false;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: 'Password';
  stores: [];
  dataBirth: string;
}

export default IUserSignUp;
