import { Container, AppBar, Toolbar } from '@mui/material';
import isLoggedIn from 'shared/constants/isLogedIn';
import AuthNav from 'widgets/AuthNav/AuthNav';
import Navigation from 'widgets/Navigation/Navigation';
import UserMenu from 'widgets/UserMenu/UserMenu';

export default function Header() {
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
