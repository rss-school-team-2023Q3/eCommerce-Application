import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';

import logoutUser from './utils/logoutUser.ts';

export default function UserMenu() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
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
            {user ? ` ${user.firstName} ${user.lastName}!` : ''}
          </p>
          <p>
            Email:
            {user ? ` ${user.email}` : ''}
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
    </div>
  );
}
