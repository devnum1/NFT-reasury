import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { MenuItem, Stack, Button } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
import useResponsive from 'src/hooks/useResponsive';
// eslint-disable-next-line import/no-unresolved
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from 'src/components/Iconify';
import MenuPopover from 'src/components/MenuPopover';

/** ---------------------------------------------------------------------- */

export default function ThemePopover(props) {
  const { translate } = useLocales();
  const { themeMode, onChangeMode } = useSettings();
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const icon = themeMode === 'dark' ? 'nasdaqswap:moon' : 'clarity:sun-solid';

  return (
    <>
      <Button
        onClick={handleOpen}
        variant={themeMode === 'light' ? 'outlined' : 'contained'}
        color="secondary"
        size={isMobile ? 'small' : 'large'}
        sx={{
          px: 0,
          minWidth: 48,
          width: 'auto',
        }}
        {...props}
      >
        <Iconify icon={icon} sx={{ width: 24, height: 24 }} />
      </Button>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
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
        }}
      >
        <Stack spacing={0.75}>
          <MenuItem
            selected={themeMode === 'dark'}
            onClick={() => {
              onChangeMode({ target: { value: 'dark' } });
              handleClose();
            }}
          >
            <Iconify icon="nasdaqswap:moon" sx={{ mr: 2 }} />
            {translate('common.darkMode')}
          </MenuItem>
          <MenuItem
            selected={themeMode === 'light'}
            onClick={() => {
              onChangeMode({ target: { value: 'light' } });
              handleClose();
            }}
          >
            <Iconify icon="clarity:sun-solid" sx={{ mr: 2 }} />
            {translate('common.lightMode')}
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}
