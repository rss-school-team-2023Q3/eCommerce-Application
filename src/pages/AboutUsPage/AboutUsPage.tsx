import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Toolbar, Typography, Link, Button, Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TeamMemberCard from 'shared/components/TeamMemberComponent/TeamMemberComponent';

import { teamMembers } from './data.ts';

function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '20px',
          paddingX: 0,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
        >
          Back
        </Button>
        <Typography className="page-title" variant="h2">
          About us
        </Typography>
        <Link href="https://rs.school/">
          <img src="./rs-school-logo.svg" alt="rs-school logo" width={40} />
        </Link>
      </Toolbar>
      <Grid container flexDirection="column" alignItems="center">
        <Typography
          fontFamily="Montserrat, sans-serif"
          fontWeight={500}
          variant="h5"
          marginBottom={2}
          marginLeft={5}
          justifyItems="flex-end"
          color="white"
        >
          Collaboration & Success
        </Typography>
        <Typography
          fontFamily="Montserrat, sans-serif"
          variant="subtitle1"
          color="white"
          marginBottom={5}
        >
          Our team worked well together through clear talks, meetings, and
          checking each other’s work, which helped us keep learning and getting
          better. We used agile methods to be able to quickly adjust to any new
          changes. Our GitHub repository was key for combining code, tracking
          issues, and managing versions, keeping everyone updated. Our different
          skills came together to finish our project successfully.
        </Typography>
        <Typography
          fontFamily="Montserrat, sans-serif"
          fontWeight={500}
          variant="h5"
          marginBottom={2}
          marginLeft={5}
          color="white"
        >
          Our Team
        </Typography>
      </Grid>
      <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
        {teamMembers.map((member) => (
          <Grid item key={member.name} sx={{}}>
            <TeamMemberCard
              name={member.name}
              photo={member.photo}
              role={member.role}
              bio={member.bio}
              contributions={member.contributions}
              github={member.github}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AboutUsPage;
