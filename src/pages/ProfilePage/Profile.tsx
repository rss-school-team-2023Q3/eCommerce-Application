import { Customer } from '@commercetools/platform-sdk';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {
  FormControlLabel,
  Switch,
  IconButton,
  FormControl,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress.ts';
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

import checkAndSave from './utils/checkAndSave.ts';
import createFormAddress from './utils/createFormAddress.ts';

import profileContext from './utils/profileContext.ts';
import './Profile.modules.css';

export default function Profile() {
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );
  const dispatch = useDispatch();

  const [isDisable, setIsDisable] = useState(true);

  const [isDisableAddr, setIsDisableAddr] = useState(true);

  const [isAddShipping, setIsAddShipping] = useState(false);

  const [isAddBilling, setIsAddBilling] = useState(false);

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  const formData = useContext(profileContext);

  formData.defaultBillingAddressId = customer.defaultBillingAddressId
    ? customer.defaultBillingAddressId
    : '';
  formData.defaultShippingAddressId = customer.defaultShippingAddressId
    ? customer.defaultShippingAddressId
    : '';

  const [isDateChange, setDateChange] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  const [isChangedAddr, setIsChangedAddr] = useState(false);

  const [shippingAddresses, setShippingAddresses] = useState(
    customer.shippingAddressIds || [],
  );

  const [billingAddresses, setBillingAddresses] = useState(
    customer.billingAddressIds || [],
  );

  function dateChange() {
    setDateChange(!isDateChange);
  }

  useEffect(() => {
    setDateChange(!isDateChange);
  }, [isDateChange]);

  useEffect(() => {
    setIsChanged(!!formData.fieldChangedSet?.size);
  }, [formData.fieldChangedSet?.size]);

  useEffect(() => {
    setIsChangedAddr(!!formData.fieldChangedSetAddr?.size);
  }, [formData.fieldChangedSetAddr?.size]);

  useEffect(() => {
    formData.addresses = customer.addresses.reduce((acc, addr) => {
      if (formData.addresses) {
        acc.push(createFormAddress(addr));
      }

      return acc;
    }, [] as IMapAddresses[]);

    return () => {
      // formData = structuredClone(initialContextProfile);
    };
  }, []);

  function onChangeForm() {}

  function onUpdateAddr() {}

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

  function addAddress(typeAddress: 'shipping' | 'billing') {
    const formAddress = formData.addresses;
    let isCheckAndSaveBilling = false;
    let isCheckAndSaveShipping = false;

    if (typeAddress === 'billing') {
      if (isAddBilling && formAddress) {
        isCheckAndSaveBilling = checkAndSave(typeAddress, formAddress);
      } else {
        setBillingAddresses([...billingAddresses, 'newBillingAddress']);
        isCheckAndSaveBilling = true;
      }

      if (isCheckAndSaveBilling) setIsAddBilling(!isAddBilling);
    } else {
      if (isAddShipping && formAddress) {
        isCheckAndSaveShipping = checkAndSave(typeAddress, formAddress);
      } else {
        setShippingAddresses([...shippingAddresses, 'newShippingAddress']);
        isCheckAndSaveShipping = true;
      }

      if (isCheckAndSaveShipping) setIsAddShipping(!isAddShipping);
    }
  }

  return (
    <div className="profile-wrapper">
      <profileContext.Provider value={formData}>
        <form
          className="profile-form"
          action="registration"
          onChange={onChangeForm}
        >
          <div className="profile-form-field">
            <div className="switcher-wrap">
              <FormControlLabel
                control={(
                  <Switch
                    checked={!isDisable}
                    className="disable-switch"
                    onChange={() => setIsDisable(!isDisable)}
                  />
                )}
                label={isDisable ? 'Edit user data' : 'Cancel data editing'}
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
              <div className="switcher-wrap">
                <FormControlLabel
                  control={(
                    <Switch
                      checked={!isDisableAddr}
                      className="disable-switch"
                      onChange={() => setIsDisableAddr(!isDisableAddr)}
                    />
                  )}
                  label={
                    isDisableAddr ? 'Edit address data' : 'Cancel data editing'
                  }
                />
                <IconButton
                  size="large"
                  // color="secondary"
                  className={`save-icon ${isChangedAddr ? 'save-visible' : 'save-unvisible'}`}
                  onClick={() => onUpdateAddr()}
                >
                  <SaveAsIcon />
                  save
                </IconButton>
              </div>
              <div className="address-input-field">
                <FormControl
                  className="data-field-profile"
                  disabled={isDisableAddr}
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
                      {billingAddresses.map((id, index) => (
                        <li key={id}>
                          <ProfileAddress
                            type="billing"
                            addressId={id}
                            index={index}
                            isDisable={isDisableAddr}
                          />
                        </li>
                      ))}
                    </ul>

                    {!isAddBilling && !isDisableAddr && (
                      <Button
                        onClick={() => addAddress('billing')}
                        className="add-address-button"
                        variant="outlined"
                        startIcon={<AddLocationAltIcon />}
                      >
                        Add billing address
                      </Button>
                    )}
                    {isAddBilling && (
                      <Button
                        onClick={() => addAddress('billing')}
                        className="add-address-button"
                        variant="outlined"
                        startIcon={<AddLocationAltIcon />}
                      >
                        Save billing addres
                      </Button>
                    )}

                    {!isDisableAddr && (
                      <FormControlLabel
                        control={<Radio value="" />}
                        label="reset default address"
                      />
                    )}
                  </RadioGroup>
                </FormControl>

                <FormControl
                  className="data-field-profile"
                  disabled={isDisableAddr}
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
                      {shippingAddresses.map((id, index) => (
                        <li key={id}>
                          <ProfileAddress
                            type="shipping"
                            addressId={id}
                            index={index}
                            isDisable={isDisableAddr}
                          />
                        </li>
                      ))}
                    </ul>
                    {isAddShipping && (
                      <Button
                        onClick={() => addAddress('shipping')}
                        className="add-address-button"
                        variant="outlined"
                        startIcon={<AddLocationAltIcon />}
                      >
                        Save shipping address
                      </Button>
                    )}

                    {!isAddShipping && !isDisableAddr && (
                      <Button
                        onClick={() => addAddress('shipping')}
                        className="add-address-button"
                        variant="outlined"
                        startIcon={<AddLocationAltIcon />}
                      >
                        Add shipping address
                      </Button>
                    )}
                    {!isDisableAddr && (
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
        </form>
      </profileContext.Provider>
    </div>
  );
}
