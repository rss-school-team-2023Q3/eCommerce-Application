function selectPriceIndex(countryCode: string) {
  if (countryCode === 'US' || countryCode === 'CA') {
    return '$';
  }

  return '€';
}

export default selectPriceIndex;
