import { Customer } from '@commercetools/platform-sdk';
// import { Button } from '@mui/material';
import { initialContext } from 'pages/SignUpPage/formContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import EmailInput from 'shared/components/InputComponents/EmailInput';
import FirstNameInput from 'shared/components/InputComponents/FirstNameInput';
import LastNameInput from 'shared/components/InputComponents/LastNameInput';
import DateInputProfile from 'shared/components/profileComponents/DateInputProfile';
import ProfileAddress from 'shared/components/profileComponents/ProfileAddress';

import './Profile.modules.css';
import profileContext from './utils/profileContext.ts';

export default function Profile() {
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  let formData = useContext(profileContext);

  const [isDateChange, setDateChange] = useState(false);

  function dateChange() {
    setDateChange(!isDateChange);
  }

  useEffect(() => {}, [isDateChange]);

  useEffect(() => {
    formData = initialContext;

    return () => {
      formData = initialContext;
    };
  }, []);

  return (
    <div className="profile-wrapper">
      <profileContext.Provider value={formData}>
        <form
          className="profile-form"
          action="registration"
          // onChange={validateForm}
        >
          <div className="profile-form-field">
            <div className="user-field-profile">
              User Data
              <EmailInput />
              <FirstNameInput />
              <LastNameInput />
              <DateInputProfile
                dateProps={{
                  isChange: dateChange,
                }}
              />
              {/* <PasswordInput /> */}
            </div>
            <div className="address-field">
              <div className="address-input-field">
                <ul className="data-field-profile">
                  <p> Billing Addresses</p>
                  {customer.billingAddressIds
                    && customer.billingAddressIds.map((id, index) => {
                      const currentAddress = customer.addresses.find(
                        (el) => el.id === id,
                      );

                      return currentAddress ? (
                        <li key={id}>
                          <ProfileAddress
                            type="billing"
                            address={currentAddress}
                            index={index}
                          />
                        </li>
                      ) : (
                        ''
                      );
                    })}
                </ul>
                <ul className="data-field-profile">
                  <p> Shipping Addresses</p>
                  {customer.shippingAddressIds
                    && customer.shippingAddressIds.map((id, index) => {
                      const currentAddress = customer.addresses.find(
                        (el) => el.id === id,
                      );

                      return currentAddress ? (
                        <li key={id}>
                          <ProfileAddress
                            type="shipping"
                            address={currentAddress}
                            index={index}
                          />
                        </li>
                      ) : (
                        ''
                      );
                    })}
                  {/* <FormControlLabel
                      className="switch-field"
                      control={(
                        <Checkbox
                          size="small"
                          checked={isShippingDefaut}
                          onChange={() => setShippingDefault(!isShippingDefaut)}
                        />
                      )}
                      label="Use as default address"
                    /> */}
                </ul>
              </div>
            </div>
          </div>
          {/* <Button
            variant="contained"
            color={isValid ? 'primary' : 'error'}
            onClick={submitChangedData}
          >
            Change data
          </Button> */}
        </form>
      </profileContext.Provider>
    </div>
  );
}
