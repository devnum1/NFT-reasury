// ----------------------------------------------------------------------
import { alpha } from '@mui/material/styles';

export default function Button(theme) {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'default' },
          style: {
            padding: theme.spacing(1, 5),
            borderRadius: '15px',
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            boxShadow: `-3px -3px 5px ${theme.palette.shadow.topLeft}, 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
            '&:hover': {
              background: theme.palette.action.hover,
              boxShadow: `-3px -3px 5px ${theme.palette.shadow.bottomRight}, 2px 2px 5px ${theme.palette.shadow.topLeft}`,
            },
            [theme.breakpoints.between('md', 'lg')]: {
              padding: theme.spacing(1, 2),
            },
          },
        },
        {
          props: { variant: 'gradient' },
          style: {
            padding: theme.spacing(2, 8),
            borderRadius: '15px',
            color: theme.palette.text.primary,
            background: `linear-gradient(95.75deg, ${theme.palette.primary.light} -9.03%, ${theme.palette.primary.main} 56.14%, ${theme.palette.primary.dark} 130.01%)`,
            boxShadow: `-3px -3px 5px ${theme.palette.shadow.topLeft}, 2px 2px 10px ${theme.palette.shadow.bottomRight}`,
            '&:hover': {
              background: `linear-gradient(95.75deg, ${theme.palette.primary.lighter} -9.03%, ${theme.palette.primary.main} 56.14%, ${theme.palette.primary.darker} 130.01%);`,
              boxShadow: `-3px -6px 5px ${theme.palette.shadow.topLeft}, 2px 4px 10px ${theme.palette.shadow.bottomRight}`,
            },
            [theme.breakpoints.between('md', 'lg')]: {
              padding: theme.spacing(1, 2),
            },
          },
        },
        {
          props: { variant: 'copy' },
          style: {
            height: 30,
            padding: theme.spacing(1, 2),
            borderRadius: '15px',
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.text.primary,
            fontWeight: 'normal',
          },
        },
      ],
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        containedInfo: {
          boxShadow: theme.customShadows.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning,
        },
        containedError: {
          boxShadow: theme.customShadows.error,
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
