// ----------------------------------------------------------------------

export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
        {
          props: { variant: 'no-shadow' },
          style: { boxShadow: 'none' },
        },
        {
          props: { variant: 'offset' },
          style: { backgroundColor: theme.palette.background.paperOffset, padding: theme.spacing(1.05, 2) },
        },
        {
          props: { variant: 'vertical' },
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(0.25),
            padding: theme.spacing(2.5, 3),
            borderRadius: theme.spacing(1.25),
          },
        },
        {
          props: { variant: 'swap' },
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            padding: theme.spacing(3.5),
            borderRadius: theme.spacing(1.25),
          },
        },
        {
          props: { variant: 'card' },
          style: {
            padding: theme.spacing(0),
            borderRadius: theme.spacing(1.25),
          },
        },
        {
          props: { variant: 'padding3' },
          style: {
            padding: theme.spacing(3),
            borderRadius: theme.spacing(1.25),
          },
        },
        {
          props: { variant: 'padding4' },
          style: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(1.25),
          },
        },
        {
          props: { variant: 'stakeCard' },
          style: {
            padding: 0,
            borderRadius: theme.spacing(5),
          },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '5px 5px 10px rgba(174, 174, 192, 0.4)',

          '&.MuiAccordion-root': {
            '&.Mui-Expanded': {
              '&:before': {
                opacity: 1,
              },
            },
          },
          '&.edit-dialog': {
            padding: '20px 30px',
            margin: 0,
            [theme.breakpoints.down('sm')]: {
              padding: '10px',
              width: 'calc(100% - 40px)',
            },
            
            [theme.breakpoints.down('lg')]: {
              maxHeight: '100%',
            },

            '@media screen and (max-height: 790px)': {
              padding: '10px',
            }
          },
        },
      },
    },
  };
}
