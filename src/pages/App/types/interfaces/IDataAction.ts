import { IFormContextType } from 'pages/SignUpPage/formContext';

export type Keys = keyof IFormContextType;

interface IDataAction {
  action: string;
  [key: string]: string;
}

export default IDataAction;
