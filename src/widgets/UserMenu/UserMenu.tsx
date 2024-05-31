import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from 'shared/api/store.ts';

import logoutUser from './utils/logoutUser.ts';

export default function UserMenu() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <NavLink to="/profile">
        <Button
          startIcon={<ManageAccountsIcon />}
          sx={{ color: 'white' }}
          variant="outlined"
        >
          Profile
        </Button>
      </NavLink>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Box>
          <p>
            Hi,
            {user ? ` ${user.firstName}!` : ''}
          </p>
        </Box>
        <Button
          startIcon={<LogoutIcon />}
          variant="contained"
          color="error"
          type="button"
          sx={{ height: 'max-content' }}
          onClick={() => logoutUser(dispatch)}
        >
          Log Out
        </Button>
      </Box>
    </>
  );
}
