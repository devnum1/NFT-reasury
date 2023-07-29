/* eslint-disable react/prop-types */
import { useState, forwardRef, Fragment } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Zoom,
  Grid,
} from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),

  '& .actionCard': {
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(3),
}));

const WalletID = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.kei.main,
  fontWeight: 700,
}));

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

const WALLETS = [
  { id: 'coinbase', title: 'Coinbase Wallet', imgUrl: '/img/coinbase.png', imgSize: { width: 48, height: 48 } },
  { id: 'connectwallet', title: 'ConnectWallet', imgUrl: '/img/connectwallet.png', imgSize: { width: 44, height: 44 } },
  { id: 'blockto', title: 'Blockto', imgUrl: '/img/blockto.png', imgSize: { width: 69, height: 69 } },
  { id: 'coin98', title: 'Coin98', imgUrl: '/img/coin98.png', imgSize: { width: 38, height: 38 } },
];

export default function SwapConfigDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnectWallet = (title) => {
    enqueueSnackbar(
      <span>
        Connecting with <WalletID>{title}</WalletID> <CircularProgress color="kei" size={16} sx={{ ml: 2 }} />
      </span>,
      {
        variant: 'kei',
        onExited: () => setOpen(false),
      }
    );
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      maxWidth={'sm'}
      onClose={handleClose}
      fullWidth={true}
      BackdropProps={{ className: 'dialog-backdrop' }}
    >
      <DialogTitle>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Typography variant="h5">Connect Wallet</Typography>
          <CloseButton type="button" onClick={handleClose} aria-label="close">
            <Iconify icon="prime:times" />
          </CloseButton>
        </Box>
      </DialogTitle>
      <ContentStyle>
        <Grid container spacing={2}>
          {WALLETS.map((w) => (
            <ActionCard
              key={w?.id}
              title={w?.title}
              imgUrl={w?.imgUrl}
              imgSize={w?.imgSize}
              onClick={handleConnectWallet}
            />
          ))}
        </Grid>
      </ContentStyle>
    </Dialog>
  );
}

const ActionCard = ({ title, imgUrl, imgSize, onClick }) => (
  <Grid item xs={6}>
    <Card variant="outlined">
      <CardActionArea className="actionCard" sx={{ minHeight: 120 }} onClick={() => onClick(title)}>
        <Box sx={{ height: 69, width: 69, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={imgUrl} sx={{ width: imgSize?.width, height: imgSize?.height }} alt={title} />
        </Box>
        <Typography variant="body2" fontWeight={700}>
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  </Grid>
);
