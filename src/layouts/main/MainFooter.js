// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { WORDING } from '../../config';
import Image from 'src/components/Image';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  minHeight: 126,
  marginTop: theme.spacing(6),
}));

const Copyright = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing('50px', 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
  overflow: 'hidden',
}));

export default function MainFooter() {
  return (
    <RootStyle>
      <Container>
        <Copyright>
          <Box
            sx={{
              opacity: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              bottom: '-50px',
            }}
          >
            <Image src="/img/metamask.png" sx={{ width: 50, height: 50 }} disabledEffect alt="Metamask" />
            <Image src="/img/coinbase.png" sx={{ width: 50, height: 50 }} disabledEffect alt="Coinbase" />
            <Image src="/img/walletconnect.png" sx={{ width: 50, height: 50 }} disabledEffect alt="WalletConnect" />
          </Box>
          <Typography variant="body2" component="p" color="text.secondary">
            Copyright {new Date().getFullYear()} {WORDING.title}. All rights reserved
          </Typography>
        </Copyright>
      </Container>
    </RootStyle>
  );
}
