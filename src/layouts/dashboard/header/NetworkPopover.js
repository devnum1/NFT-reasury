import { useState } from 'react';
import clsx from 'clsx';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box, MenuItem, Stack, Typography } from '@mui/material';
// components
import MenuPopover from 'src/components/MenuPopover';
import Avatar from 'src/components/Avatar';
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';

/** ---------------------------------------------------------------------- */

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .menuTitle': {
    margin: theme.spacing(1),
  },
}));

const OptionStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',

  '& .optionContent': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  '& .leftContent': {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  '& .optionAdditional': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .link': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: theme.palette.text.primary,

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },

  '& .dot': {
    height: 12,
    width: 12,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 12,
  },
}));

const SelectedStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const NETWORKS = [
  {
    id: 4687,
    name: 'BSC Mainnet',
    url: 'https://bscscan.com',
    symbol: 'BNB',
    label: 'BscScan',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
  },
  {
    id: 1027,
    name: 'Ethereum',
    url: 'https://ethereum.org',
    label: 'Ethereum',
    symbol: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    id: 3890,
    name: 'Polygon',
    url: 'https://polygon.technology',
    symbol: 'MATIC',
    label: 'Polygon',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  },
];

export default function NetworkPopover(props) {
  const theme = useTheme();
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <RootStyle>
      <Button
        /**
         * Uncomment code below to activate theme mode popover
         */
        onClick={handleOpen}
        variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
        color="primary"
        size="large"
        {...props}
      >
        <SelectedStyle>
          <Avatar sx={{ height: 16, width: 16 }}>
            <Image src={network?.icon} sx={{ width: 16, height: 16 }} />
          </Avatar>
          <Typography variant="body1" fontWeight={700}>
            {network?.name}
          </Typography>
        </SelectedStyle>
      </Button>

      <MenuPopover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(open)}
        arrow="top-left"
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 8 * 27,
          p: 2,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '&.Mui-selected': {
              backgroundColor: theme.palette.background.popActive,
              '&:hover': {
                backgroundColor: theme.palette.background.popActive,
              },
            },
          },
          '& .menuTitle': {
            mb: 1,
          },
        }}
      >
        <Stack spacing={0.75}>
          <Typography variant="body1" fontWeight={700} className="menuTitle">
            Select Network
          </Typography>
          {NETWORKS.map((n, nIdx) => {
            const selected = network?.name === NETWORKS[nIdx]['name'];
            return (
              <MenuItem
                key={`net.${nIdx}`}
                selected={selected}
                onClick={() => {
                  if (!selected) {
                    setNetwork(NETWORKS[nIdx]);
                  }
                  handleClose();
                }}
              >
                <OptionStyle className={clsx({ selected })}>
                  <Box className="optionContent">
                    <Box className="leftContent">
                      <Avatar sx={{ height: 16, width: 16 }}>
                        <Image src={n?.icon} sx={{ width: 16, height: 16 }} />
                      </Avatar>
                      <Typography variant="body1" fontWeight={700}>
                        {n?.name}
                      </Typography>
                    </Box>
                    {selected && <Box className="dot" />}
                  </Box>
                  {selected && (
                    <Box className="optionAdditional">
                      <Typography variant="body2" component="div">
                        {n?.label}
                      </Typography>
                      <Typography variant="body2" component="a" target="_blank" className="link" href={n?.url}>
                        <Iconify icon="nasdaqswap:new-tab" sx={{ height: 16, width: 16 }} />
                      </Typography>
                    </Box>
                  )}
                </OptionStyle>
              </MenuItem>
            );
          })}
        </Stack>
      </MenuPopover>
    </RootStyle>
  );
}
