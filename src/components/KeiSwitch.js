/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Switch } from '@mui/material';

const KeiSwitchComponent = styled((props) => <Switch disableRipple {...props} />)(({ theme, checked }) => ({
  width: 62,
  height: 38,
  padding: 4,
  border: '1px solid white',
  borderRadius: '42px',
  transition: theme.transitions.create(['opacity'], {
    duration: 500,
  }),
  opacity: 0.2,
  ...(checked && {
    opacity: 1,
  }),
  '& .MuiSwitch-switchBase': {
    padding: 3,
    margin: 4,
    transitionDuration: '300ms',
    '& + .MuiSwitch-track': {
      backgroundColor: alpha(theme.palette.text.primary, 0.1),
      border: 0,
    },
    '&.Mui-checked': {
      opacity: 1,
      transform: 'translateX(24px)',
      color: '#fff',
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: '42px',
    opacity: 1,
  },
}));

const NumberFormatComponent = forwardRef(({ value, onChange = () => {}, ...props }, ref) => (
  <KeiSwitchComponent ref={ref} value={value} onChange={onChange} {...props} />
));

export default NumberFormatComponent;
