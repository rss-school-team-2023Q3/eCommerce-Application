import { currentClient } from 'shared/libs/commercetools/apiBuilder';

interface IClient {
  client: typeof currentClient;
}
export default IClient;
