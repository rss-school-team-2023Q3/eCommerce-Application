interface IPostCodeInterface {
  returnCode: (code: string) => void;
  isCountryChange: boolean;
}

export default IPostCodeInterface;
