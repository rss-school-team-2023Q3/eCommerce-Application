import { Customer } from '@commercetools/platform-sdk';
import { FormControlLabel, Switch } from '@mui/material';
// import { Button } from '@mui/material';
import { initialContext } from 'pages/SignUpPage/formContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import DateInputProfile from 'shared/components/profileComponents/DateInputProfile';
import EmailProfile from 'shared/components/profileComponents/EmailProfile.tsx';
import FirstNameProfile from 'shared/components/profileComponents/FirstNameProfile.tsx';
import LastNameProfile from 'shared/components/profileComponents/LastNameProfile.tsx';
import PasswordProfile from 'shared/components/profileComponents/PasswordProfle';
import ProfileAddress from 'shared/components/profileComponents/ProfileAddress';

import profileContext from './utils/profileContext.ts';

import './Profile.modules.css';

export default function Profile() {
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );

  const [isDisable, setIsDisable] = useState(true);

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
    formData = structuredClone(initialContext);

    return () => {
      formData = structuredClone(initialContext);
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
          <FormControlLabel
            control={(
              <Switch
                className="disable-switch"
                onChange={() => setIsDisable(!isDisable)}
              />
            )}
            label={isDisable ? 'Edit data' : 'Cancel data editing'}
          />

          <div className="profile-form-field">
            <div className="user-field-profile">
              User Data
              <EmailProfile isDisable={isDisable} />
              <FirstNameProfile isDisable={isDisable} />
              <LastNameProfile isDisable={isDisable} />
              <DateInputProfile
                dateProps={{
                  isChange: dateChange,
                  isDisable,
                }}
              />
              <PasswordProfile isDisable={isDisable} />
            </div>
            <div className="address-field">
              <div className="address-input-field">
                <ul className="data-field-profile">
                  <p> Billing Addresses</p>
                  {customer.billingAddressIds
                    && customer.billingAddressIds.map((id, index) => (
                      <li key={id}>
                        <ProfileAddress
                          type="billing"
                          addressId={id}
                          index={index}
                          isDisable={isDisable}
                        />
                      </li>
                    ))}
                </ul>
                <ul className="data-field-profile">
                  <p> Shipping Addresses</p>
                  {customer.shippingAddressIds
                    && customer.shippingAddressIds.map((id, index) => (
                      <li key={id}>
                        <ProfileAddress
                          type="billing"
                          addressId={id}
                          index={index}
                          isDisable={isDisable}
                        />
                      </li>
                    ))}
                  {/* {customer.shippingAddressIds
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
                    })} */}
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
