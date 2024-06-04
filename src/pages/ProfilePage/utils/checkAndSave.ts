import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress';
import capitalizeFirstLetter from 'shared/utils/capitalizeFirstLetter';

type SearchWordType = 'newShippingAddress' | 'newBillingAddress';

export default function checkAndSave(
  typeAddress: 'shipping' | 'billing',
  addresses: IMapAddresses[],
): boolean {
  const searchWord: SearchWordType = `new${capitalizeFirstLetter(typeAddress)}Address` as SearchWordType;

  // console.log(searchWord);
  const address = addresses.find((el) => el.id === searchWord);

  // console.log(address);

  return !address;
}
