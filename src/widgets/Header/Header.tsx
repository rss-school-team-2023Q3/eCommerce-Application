import {
  Container, AppBar, Toolbar, FormControlLabel,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
import AuthNav from 'widgets/AuthNav/AuthNav';
import MaterialUISwitch from 'widgets/MaterialUISwitch/MaterialUISwitch';
import Navigation from 'widgets/Navigation/Navigation';
import UserMenu from 'widgets/UserMenu/UserMenu';

interface IHeaderProps {
  onTheme: (event: React.SyntheticEvent, checked: boolean) => void;
}

export default function Header({ onTheme }: IHeaderProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <AppBar elevation={24}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Navigation />
        <Toolbar>{isLoggedIn ? <UserMenu /> : <AuthNav />}</Toolbar>
        <FormControlLabel
          checked={localStorage.getItem('theme') === 'dark'}
          onChange={onTheme}
          control={<MaterialUISwitch />}
          label=""
        />
      </Container>
    </AppBar>
  );
}
