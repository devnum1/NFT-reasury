import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '30ch',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '.MuiFormControl-root': {
    width: '100%',
  },

  '.MuiInputBase-root': {
    borderRadius: theme.spacing('15px'),
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

export default function SearchField({ value = '', onChange }) {
  return (
    <RootStyle>
      <TextField
        id="search-field"
        variant="filled"
        InputProps={{
          autoComplete: 'off',
          placeholder: 'Search NFTs',
          startAdornment: <Iconify icon="nft:search" className="searchAdornment" />,
        }}
        value={value}
        onChange={onChange}
      />
    </RootStyle>
  );
}
