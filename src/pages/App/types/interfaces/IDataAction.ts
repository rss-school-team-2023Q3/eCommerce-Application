import { IFormContextType } from 'pages/SignUpPage/formContext';

export type Keys = keyof IFormContextType;

export interface IUserAction {
  action: string;
  [key: string]: string;
}

export interface IPasswordAction {
  action: string;
  currentPassword: string;
  newPassword: string;
}
type IDataActions = IUserAction | IPasswordAction;

export default IDataActions;
