
export default function IconButton(theme) {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { variant: 'default' },
          style: {
            padding: theme.spacing(2),
            borderRadius: '50%',
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            boxShadow: `-3px -3px 5px ${theme.palette.shadow.topLeft}, 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
            '&:hover': {
              background: theme.palette.background.neutral,
            },
            [theme.breakpoints.between('md', 'lg')]: {
              padding: theme.spacing(2.5),
            },
          },
        },
      ],
      styleOverrides: {
        root: {
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
