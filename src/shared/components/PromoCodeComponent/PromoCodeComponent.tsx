import {
  Button, Card, CardContent, Typography,
} from '@mui/material';
import { useState } from 'react';

function PromoCodeComponent() {
  const [isCopied, setIsCopied] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText('SUMMER').then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  return (
    <Card
      elevation={24}
      sx={{ my: '3rem' }}
      style={{
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        boxShadow: '12px 12px 20px -12px rgba(58, 91, 182, 0.815)',
        // background:
        //   'radial-gradient(circle, rgba(197,224,255,1) 0%, rgba(221,212,255,1) 100%)',
      }}
    >
      <CardContent>
        <Typography
          // color="#44367b"
          fontWeight={500}
          textAlign="left"
          fontFamily="Montserrat, sans-serif"
        >
          Use Promo Code
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          fontFamily="Montserrat, sans-serif"
          m="10px 0"
          fontWeight={800}
          sx={{
            background: '#ffffff',
            borderRadius: '5px',
            border: '2px solid',
          }}
          color="#1569bd"
        >
          SUMMER
        </Typography>
        <Typography
          // color="textSecondary"
          fontFamily="Montserrat, sans-serif"
          marginBottom={2}
          fontWeight={500}
        >
          Only this summer get a 25% discount on all products!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={copyCodeToClipboard}
        >
          {isCopied ? 'Copied!' : 'Copy Code'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default PromoCodeComponent;
