import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

const RootStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '.MuiFormControl-root': {
    width: '100%',
  },

  '.MuiInputBase-root': {
    borderRadius: theme.spacing('15px'),
    paddingRight: '5px',
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
  },
  '.MuiInputBase-input': {
    padding: theme.spacing(2),
  },
  '.searchAdornment': {
    height: 21,
    width: 21,
    color: theme.palette.text.secondary,
  },
}));

export default function SubscribeForm() {
  return (
    <RootStyle>
      <TextField
        id="subscribe"
        variant="filled"
        InputProps={{
          autoComplete: 'off',
          placeholder: 'Type your email',
          endAdornment: (
            <Button
              variant="gradient"
              sx={{
                px: '25px',
                py: '12px',
                minWidth: 120,
                height: 40,
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '10px',
              }}
            >
              Subscribe
            </Button>
          ),
        }}
      />
    </RootStyle>
  );
}
