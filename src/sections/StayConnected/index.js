import { styled } from '@mui/material/styles';
import { Box, Container, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/Iconify';
import SubscribeForm from 'src/components/SubscribeForm';

const RootStyle = styled('section')(({ theme }) => ({
  marginTop: theme.spacing('100px'),
  paddingBottom: theme.spacing('25px'),

  '.social': {
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const HorizontalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(3),
  },
}));

export default function StayConnected() {
  return (
    <RootStyle>
      <Container>
        <HorizontalBox>
          <Typography variant="title3020" component="h1">
            Stay Connected
          </Typography>
          {/* <SubscribeForm /> */}
          <Box display="flex" flexDirection="row" gap={2.5}>
            <IconButton component="a" variant="default" className="social" href="https://discord.gg/thenftreasury" target="_blank" rel="noopener noreferrer">
              <Iconify icon="logos:discord-icon" />
            </IconButton>
            <IconButton variant="default" className="social" href="https://twitter.com/theNFtreasury" target="_blank" rel="noopener noreferrer">
              <Iconify icon="akar-icons:twitter-fill" sx={{ color: '#2F88FF' }} />
            </IconButton>
          </Box>
        </HorizontalBox>
      </Container>
    </RootStyle>
  );
}
