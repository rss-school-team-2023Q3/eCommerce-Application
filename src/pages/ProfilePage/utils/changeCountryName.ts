export default function changeCountryName(name: string | undefined): string {
  switch (name) {
    case 'DE':
      return 'Germany';
    case 'CA':
      return 'Canada';
    case 'US':
      return 'USA';
    case 'GB':
      return 'Great Britan';
    default:
      return '';
  }
}
