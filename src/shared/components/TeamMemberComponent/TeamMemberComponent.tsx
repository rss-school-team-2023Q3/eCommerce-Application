import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Card, CardContent, Typography, Link, Grid,
} from '@mui/material';
import { ITeamMember } from 'pages/App/types/interfaces/ITeamMember';

function TeamMemberCard({
  name,
  photo,
  role,
  bio,
  contributions,
  github,
}: ITeamMember) {
  return (
    <Card
      elevation={24}
      sx={{
        display: 'flex',
        maxWidth: 850,
        padding: '40px 20px',
        boxShadow: '12px 12px 20px -12px rgba(58, 91, 182, 0.815)',
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            '@media (max-width:690px)': {
              justifyContent: 'center',
              flexGrow: 1,
              maxWidth: '100%',
              flexBasis: '100%',
            },
          }}
        >
          <img
            src={photo}
            alt={name}
            style={{
              width: '220px',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '5%',
              border: '2px solid rgba(96, 113, 157, 0.815)',
            }}
          />
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            '@media (max-width:690px)': {
              textAlign: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              maxWidth: '100%',
              flexBasis: '100%',
            },
          }}
        >
          <CardContent>
            <Typography fontFamily="Montserrat, sans-serif" variant="h5">
              {name}
            </Typography>
            <Typography
              fontFamily="Montserrat, sans-serif"
              variant="subtitle1"
              // color="#666"
              marginBottom={1}
            >
              {role}
            </Typography>
            <Link href={github} target="_blank" rel="noopener">
              <GitHubIcon sx={{ color: 'CurrentColor' }} />
            </Link>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent
            sx={{
              textAlign: 'left',
            }}
          >
            <Typography
              fontFamily="Montserrat, sans-serif"
              variant="h6"
              marginBottom={1}
              fontWeight={600}
            >
              Bio
              {' '}
            </Typography>
            <Typography
              fontFamily="Montserrat, sans-serif"
              variant="body1"
              marginBottom={2}
              // color="#666"
            >
              {bio}
            </Typography>
            <Typography
              fontFamily="Montserrat, sans-serif"
              variant="h6"
              marginBottom={1}
              fontWeight={600}
            >
              Contributions
              {' '}
            </Typography>
            <Typography
              fontFamily="Montserrat, sans-serif"
              variant="body1"
              // color="#666"
            >
              {contributions}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TeamMemberCard;
