import { LinearProgress } from '@mui/material';

export default function Loader() {
  return (
    <LinearProgress
      sx={{ width: '100%', alignSelf: 'center', padding: '10' }}
    />
  );
}
