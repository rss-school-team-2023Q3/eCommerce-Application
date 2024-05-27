import { Container } from '@mui/material';

import CityInput from 'shared/components/InputComponents/CityInput';
import CountryInput from 'shared/components/InputComponents/CountryInput';
import PostalCodeInput from 'shared/components/InputComponents/PostalCodeInput';
import StreetInput from 'shared/components/InputComponents/StreetInput';

export default function Address() {
  return (
    <Container>
      {' '}
      address
      <StreetInput
        streetProps={{
          type: 'billing',
        }}
      />
      <CityInput
        cityProps={{
          type: 'billing',
        }}
      />
      <PostalCodeInput
        postalProps={{
          isChange: false,
          type: 'billing',
        }}
      />
      <CountryInput
        countryProps={{ isUpdate: () => 'updateCountry', type: 'billing' }}
      />
    </Container>
  );
}
