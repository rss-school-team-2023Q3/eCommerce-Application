import { Customer } from '@commercetools/platform-sdk';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {
  FormControlLabel,
  Switch,
  FormControl,
  RadioGroup,
  Button,
  IconButton,
} from '@mui/material';
import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress.ts';
import actionsSDK from 'pages/ProfilePage/utils/actionsSDK';
import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'shared/api/authApi/store/authSlice.ts';
import { RootState } from 'shared/api/store.ts';
import DateInputProfile from 'shared/components/profileComponents/DateInputProfile';
import EmailProfile from 'shared/components/profileComponents/EmailProfile.tsx';
import FirstNameProfile from 'shared/components/profileComponents/FirstNameProfile.tsx';
import LastNameProfile from 'shared/components/profileComponents/LastNameProfile.tsx';
import PasswordProfile from 'shared/components/profileComponents/PasswordProfle';
import ProfileAddress from 'shared/components/profileComponents/ProfileAddress';
import { currentClient } from 'shared/libs/commercetools/apiBuilder.ts';
import { toastSuccess } from 'shared/utils/notifications.ts';

import actionsAddressAddSDK from './utils/actionsAddressSDK.ts';
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

  const [isValidShipping, setIsValidShipping] = useState(false);

  const [isValidBilling, setIsValidBilling] = useState(false);

  const [defaultBiilingAddr, setDefaultBiilingAddr] = useState(
    customer?.defaultBillingAddressId || '',
  );

  const [defaultShippingAddr, setDefaultShippingAddr] = useState(
    customer?.defaultShippingAddressId || '',
  );

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  const formData = useContext(profileContext);

  formData.defaultBillingAddressId = customer?.defaultBillingAddressId
    ? customer?.defaultBillingAddressId
    : '';
  formData.defaultShippingAddressId = customer?.defaultShippingAddressId
    ? customer?.defaultShippingAddressId
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
    setBillingAddresses(customer.billingAddressIds || []);
    const delAddrIndex = formData.addresses?.findIndex(
      (el) => el.id === '"newBillingAddress"',
    );

    if (delAddrIndex) formData.addresses?.splice(delAddrIndex, 1);
  }, [customer.billingAddressIds?.length]);

  useEffect(() => {
    setShippingAddresses(customer.shippingAddressIds || []);
    const delAddrIndex = formData.addresses?.findIndex(
      (el) => el.id === '"newShippingAddress"',
    );

    if (delAddrIndex) formData.addresses?.splice(delAddrIndex, 1);
  }, [customer.shippingAddressIds?.length]);

  useEffect(() => {
    setIsDisableAddr(true);
  }, [customer.addresses?.length]);

  useEffect(() => {
    if (formData.addresses && customer.addresses) {
      formData.addresses = customer.addresses.reduce((acc, addr) => {
        if (formData.addresses) {
          acc.push(createFormAddress(addr));
        }

        return acc;
      }, [] as IMapAddresses[]);
      setBillingAddresses(customer.billingAddressIds || []);
      setShippingAddresses(customer.shippingAddressIds || []);
    }

    setIsAddShipping(false);
    setIsAddBilling(false);
    setIsValidShipping(false);
    setIsValidBilling(false);
  }, [isDisableAddr]);

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

  function onChangeAddressForm() {
    const formAddresses = formData.addresses;

    if (!formAddresses) return;

    const newIdShipping = formAddresses.find(
      (el) => el.id === 'newShippingAddress',
    );

    if (newIdShipping) {
      const isValidShipp = Object.values(newIdShipping.value).every(
        (el) => el.isValid,
      );

      setIsValidShipping(isValidShipp);
    }

    const newIdBilling = formAddresses.find(
      (el) => el.id === 'newBillingAddress',
    );

    if (newIdBilling) {
      const isValidBill = Object.values(newIdBilling.value).every(
        (el) => el.isValid,
      );

      setIsValidBilling(isValidBill);
    }
  }

  function onChangeUserForm() {}

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
        isCheckAndSaveBilling = true;
      } else if (!isAddBilling) {
        setBillingAddresses([...billingAddresses, 'newBillingAddress']);
        isCheckAndSaveBilling = true;
      }

      if (isCheckAndSaveBilling) setIsAddBilling(!isAddBilling);
    } else {
      if (isAddShipping && formAddress) {
        // isCheckAndSaveShipping = checkAndSave(typeAddress, formAddress);
        isCheckAndSaveShipping = true;
      } else {
        setShippingAddresses([...shippingAddresses, 'newShippingAddress']);
        isCheckAndSaveShipping = true;
      }

      if (isCheckAndSaveShipping) setIsAddShipping(!isAddShipping);
    }
  }

  async function saveAddress(type: 'shipping' | 'billing') {
    if (customer) {
      const result = await actionsAddressAddSDK(
        formData,
        type,
        customer.id,
        customer.version,
        dispatch,
      );

      if (result?.statusCode === 200 && type === 'shipping') {
        setIsAddShipping(false);
        setIsValidShipping(false);
        setIsDisableAddr(true);
      }

      if (result?.statusCode === 200 && type === 'billing') {
        setIsAddBilling(false);
        setIsValidBilling(false);
        setIsDisableAddr(true);
      }
    }
  }

  async function changeDefaultAddress(
    e: ChangeEvent<HTMLInputElement>,
    type: 'shipping' | 'billing',
  ) {
    const addressId = e.target.value;

    if (!addressId || !customer?.id || !customer?.version) return null;

    let res;

    if (type === 'shipping') {
      setDefaultShippingAddr(addressId);
      res = await currentClient.setDefaultShippingAddr(
        addressId,
        customer.id,
        customer.version,
      );
    }

    if (type === 'billing') {
      setDefaultBiilingAddr(addressId);
      res = await currentClient.setDefaultBillingAddr(
        addressId,
        customer.id,
        customer.version,
      );
    }

    if (res?.statusCode === 200) {
      toastSuccess(`default ${type} address changed`);
      dispatch(setCredentials({ user: res.body }));
      setIsDisableAddr(true);
    }

    return null;
  }

  return (
    <div className="profile-wrapper">
      <profileContext.Provider value={formData}>
        <div className="profile-form-field">
          <form className="profile-form" onChange={onChangeUserForm}>
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
          </form>
          <form className="profile-form" onChange={onChangeAddressForm}>
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
                      customer?.defaultBillingAddressId
                        ? customer.defaultBillingAddressId
                        : ''
                    }
                    value={defaultBiilingAddr}
                    onChange={(e) => changeDefaultAddress(e, 'billing')}
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-billing"
                  >
                    <ul className="data-field-list">
                      <p> Billing Addresses</p>
                      {billingAddresses.map((id, index) => (
                        <li key={id}>
                          {customer.addresses.find(
                            (el) => el.id === id || id === 'newBillingAddress',
                          ) && (
                            <ProfileAddress
                              type="billing"
                              addressId={id}
                              index={index}
                              isDisable={isDisableAddr}
                            />
                          )}
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
                    {isAddBilling && isValidBilling && (
                      <Button
                        onClick={() => saveAddress('billing')}
                        className="add-address-button"
                        variant="outlined"
                        startIcon={<AddLocationAltIcon />}
                      >
                        Save billing address
                      </Button>
                    )}

                    {/* {!isDisableAddr && (
                      <FormControlLabel
                        control={<Radio value="" />}
                        label="reset default address"
                      />
                    )} */}
                  </RadioGroup>
                </FormControl>

                <FormControl
                  className="data-field-profile"
                  disabled={isDisableAddr}
                >
                  <RadioGroup
                    defaultValue={customer.defaultShippingAddressId}
                    value={defaultShippingAddr}
                    onChange={(e) => changeDefaultAddress(e, 'shipping')}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-shipping"
                  >
                    <ul className="data-field-list">
                      <p> Shipping Addresses</p>
                      {shippingAddresses.map((id, index) => (
                        <li key={id}>
                          {customer.addresses.find(
                            (el) => el.id === id || id === 'newShippingAddress',
                          ) && (
                            <ProfileAddress
                              type="shipping"
                              addressId={id}
                              index={index}
                              isDisable={isDisableAddr}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                    {isAddShipping && isValidShipping && (
                      <Button
                        onClick={() => saveAddress('shipping')}
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
                    {/* {!isDisableAddr && (
                      <FormControlLabel
                        control={<Radio value="" />}
                        label="reset default address"
                      />
                    )} */}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </form>
        </div>
      </profileContext.Provider>
    </div>
  );
}
