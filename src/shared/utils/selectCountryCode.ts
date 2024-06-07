function selectCountryCode(country: string): string {
  let value: string = '';

  switch (country) {
    case 'Great Britain': {
      value = 'GB';
      break;
    }
    case 'Germany': {
      value = 'DE';
      break;
    }
    case 'Canada': {
      value = 'CA';
      break;
    }
    case 'USA': {
      value = 'US';
      break;
    }
    default: {
      value = country;
      break;
    }
  }

  return value;
}

export default selectCountryCode;
