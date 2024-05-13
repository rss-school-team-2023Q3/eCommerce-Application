import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Box } from '@mui/material';

export default function UserMenu() {
  const user = { name: 'someUser', email: 'someEmail' };

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
            {user.name}
            {' '}
            !
          </p>
          <p>
            Email:
            {user.email}
          </p>
        </Box>
        <Button
          startIcon={<LogoutIcon />}
          variant="contained"
          color="error"
          type="button"
          sx={{ height: 'max-content' }}
          // onClick={() => dispatch(logOut())}
        >
          Log Out
        </Button>
      </Box>
    </div>
  );
}
