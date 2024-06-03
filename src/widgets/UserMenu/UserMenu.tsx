import LogoutIcon from '@mui/icons-material/Logout';
import './UserMenu.modules.css';
import { Button, Box, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/api/store.ts';

import logoutUser from './utils/logoutUser.ts';

export default function UserMenu() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <Box className="user-greeting">
        <p>
          Hi,
          {user ? ` ${user.firstName}!` : ''}
        </p>
      </Box>
      <Tooltip title="Log Out">
        <Button
          startIcon={<LogoutIcon />}
          variant="contained"
          color="error"
          type="button"
          sx={{ height: 'max-content' }}
          onClick={() => logoutUser(dispatch)}
        >
          <span className="button-text">Log Out</span>
        </Button>
      </Tooltip>
    </Box>
  );
}
