import { Customer } from '@commercetools/platform-sdk';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {
  FormControlLabel,
  Switch,
  IconButton,
  FormControl,
  RadioGroup,
  Radio,
} from '@mui/material';
import actionsSDK from 'pages/ProfilePage/utils/actionsSDK';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/api/store.ts';
import DateInputProfile from 'shared/components/profileComponents/DateInputProfile';
import EmailProfile from 'shared/components/profileComponents/EmailProfile.tsx';
import FirstNameProfile from 'shared/components/profileComponents/FirstNameProfile.tsx';
import LastNameProfile from 'shared/components/profileComponents/LastNameProfile.tsx';
import PasswordProfile from 'shared/components/profileComponents/PasswordProfle';
import ProfileAddress from 'shared/components/profileComponents/ProfileAddress';

import profileContext, {
  initialContextProfile,
} from './utils/profileContext.ts';

import './Profile.modules.css';

export default function Profile() {
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );
  const dispatch = useDispatch();

  const [isDisable, setIsDisable] = useState(true);

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  let formData = useContext(profileContext);

  formData.defaultBillingAddressId = customer.defaultBillingAddressId
    ? customer.defaultBillingAddressId
    : '';
  formData.defaultShippingAddressId = customer.defaultShippingAddressId
    ? customer.defaultShippingAddressId
    : '';

  const [isDateChange, setDateChange] = useState(false);

  const [isChanged, setIsChanged] = useState(false);

  function dateChange() {
    setDateChange(!isDateChange);
  }

  useEffect(() => {
    setDateChange(!isDateChange);
  }, [isDateChange]);

  useEffect(() => {
    setIsChanged(!!formData.fieldChangedSet?.size);
  }, [formData.fieldChangedSet?.size]);

  useEffect(
    () => () => {
      formData = structuredClone(initialContextProfile);
    },
    [],
  );

  function onChangeForm() {}

  async function onUpdate() {
    await actionsSDK(
      formData,
      customer?.id as string,
      customer?.version as number,
      dispatch,
    );
    formData.fieldChangedSet = new Set();
    setIsDisable(true);
  }

  return (
    <div className="profile-wrapper">
      <profileContext.Provider value={formData}>
        <form
          className="profile-form"
          action="registration"
          onChange={onChangeForm}
        >
          <div className="switcher-wrap">
            <FormControlLabel
              control={(
                <Switch
                  checked={!isDisable}
                  className="disable-switch"
                  onChange={() => setIsDisable(!isDisable)}
                />
              )}
              label={isDisable ? 'Edit data' : 'Cancel data editing'}
            />
            <IconButton
              size="large"
              // color="secondary"
              className={`save-icon ${isChanged ? 'save-visible' : 'save-unvisible'}`}
              onClick={() => onUpdate()}
            >
              <SaveAsIcon />
              save
            </IconButton>
          </div>
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
                <FormControl
                  className="data-field-profile"
                  disabled={isDisable}
                >
                  <RadioGroup
                    defaultValue={
                      customer.defaultBillingAddressId
                        ? customer.defaultBillingAddressId
                        : ''
                    }
                    onChange={(e) => {
                      formData.defaultBillingAddressId = e.target.value;
                    }}
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-billing"
                  >
                    <ul className="data-field-list">
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
                    {!isDisable && (
                      <FormControlLabel
                        control={<Radio value="" />}
                        label="reset default address"
                      />
                    )}
                  </RadioGroup>
                </FormControl>

                <FormControl
                  className="data-field-profile"
                  disabled={isDisable}
                >
                  <RadioGroup
                    defaultValue={customer.defaultShippingAddressId}
                    onChange={(e) => {
                      formData.defaultShippingAddressId = e.target.value;
                    }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-shipping"
                  >
                    <ul className="data-field-list">
                      <p> Shipping Addresses</p>
                      {customer.shippingAddressIds
                        && customer.shippingAddressIds.map((id, index) => (
                          <li key={id}>
                            <ProfileAddress
                              type="shipping"
                              addressId={id}
                              index={index}
                              isDisable={isDisable}
                            />
                          </li>
                        ))}
                    </ul>
                    {!isDisable && (
                      <FormControlLabel
                        control={<Radio value="" />}
                        label="reset default address"
                      />
                    )}
                  </RadioGroup>
                </FormControl>
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
