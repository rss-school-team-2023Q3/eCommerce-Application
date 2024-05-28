import { IFormContextType, initialContext } from 'pages/SignUpPage/formContext';
import { Context, createContext } from 'react';

const profileContext: Context<IFormContextType> = createContext(initialContext);

export default profileContext;
