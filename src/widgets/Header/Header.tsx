import { Container, AppBar, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import AuthNav from 'widgets/AuthNav/AuthNav';
import Navigation from 'widgets/Navigation/Navigation';
import UserMenu from 'widgets/UserMenu/UserMenu';

export default function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <AppBar>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Navigation />
        <Toolbar>{isLoggedIn ? <UserMenu /> : <AuthNav />}</Toolbar>
      </Container>
    </AppBar>
  );
}
