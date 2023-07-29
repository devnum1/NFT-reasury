import { alpha } from '@mui/material/styles';
/** ---------------------------------------------------------------------- */

export default function Backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.common.black, 0.68),
          
          '&.dialog-backdrop': {
            // backdropFilter: 'blur(8px)',
          },
          '&.blurred-backdrop': {
            backgroundColor: alpha(theme.palette.common.black, 0.2),
            backdropFilter: 'blur(8px)',
          },
          '&.profile-popover-backdrop': {
            backgroundColor: alpha(theme.palette.common.black, 0),
          },
          '&.select-backdrop': {
            backgroundColor: alpha(theme.palette.common.black, 0),
          },
        },
      },
    },
  };
}
