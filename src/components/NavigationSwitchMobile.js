/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Switch } from '@mui/material';

const NavigationSwitchComponent = styled((props) => <Switch disableRipple {...props} />)(({ theme }) => ({
  width: 60,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    top: 3,
    left: 0,
    padding: 0,
    transform: 'translateX(3px)',
    backgroundColor: 'transparent',
    '&.Mui-checked': {
      left: 0,
      right: -7,
      color: '#fff',
      transform: 'translateX(11px)',
      '& .MuiSwitch-thumb:before': {
        // Right Selected
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6.85714" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2"/><circle cx="11" cy="11" r="4.5" stroke="${encodeURIComponent(
          '#fff'
        )}"/><path d="M11 1V3.85714" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M21 11L18.1429 11" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M11 18.1429V21" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M3.85718 11L1.0003 11" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M19.6604 6L17.186 7.42857" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M4.81421 14.5714L2.33985 16" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M2.3396 6L4.81396 7.42857" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M17.1858 14.5714L19.6601 16" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M16 2.33972L14.5714 4.81408" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M7.42847 17.1859L5.9999 19.6603" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M6 2.33972L7.42857 4.81408" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/><path d="M14.5715 17.1859L16.0001 19.6603" stroke="${encodeURIComponent(
          '#fff'
        )}" stroke-width="2" stroke-linecap="round"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${alpha('#AEAEC0', 0.5)}`,
        '&:before': {
          position: 'absolute',
          content: "''",
          // Left Unselected
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.295857 7.58664C-0.0456849 7.89285 0.170919 8.45893 0.62963 8.45893H0.96352C1.5158 8.45893 1.96352 8.90664 1.96352 9.45893V17.2948C1.96352 17.837 1.52397 18.2765 0.98176 18.2765H0.846340C0.378921 18.2765 0 18.6555 0 19.1229C0 19.5903 0.37892 19.9692 0.846343 19.9692H17.4347C17.9021 19.9692 18.281 19.5903 18.281 19.1229C18.281 18.6555 17.9021 18.2765 17.4347 18.2765H17.2993C16.7571 18.2765 16.3175 17.837 16.3175 17.2948V9.45893C16.3175 8.90664 16.7652 8.45893 17.3175 8.45893H17.6514C18.1101 8.45893 18.3267 7.89285 17.9852 7.58664L9.80807 0.25543C9.4282 -0.0851437 8.85285 -0.0851433 8.47298 0.255431L0.295857 7.58664ZM9.14048 8.459C8.57958 8.459 8.12487 8.91371 8.12487 9.47462V17.5995C8.12487 18.1604 8.57958 18.6151 9.14048 18.6151C9.70139 18.6151 10.1561 18.1604 10.1561 17.5995V9.47461C10.1561 8.91371 9.70139 8.459 9.14048 8.459ZM12.1874 9.47462C12.1874 8.91371 12.6421 8.459 13.203 8.459C13.7639 8.459 14.2186 8.91371 14.2186 9.47461V17.5995C14.2186 18.1604 13.7639 18.6151 13.203 18.6151C12.6421 18.6151 12.1874 18.1604 12.1874 17.5995V9.47462ZM5.07803 8.459C4.51712 8.459 4.06242 8.91371 4.06242 9.47462V17.5995C4.06242 18.1604 4.51712 18.6151 5.07803 18.6151C5.63894 18.6151 6.09365 18.1604 6.09365 17.5995V9.47461C6.09365 8.91371 5.63894 8.459 5.07803 8.459Z" fill="${encodeURIComponent(
            '#000'
          )}"/></svg>')`,
          backgroundRepeat: 'no-repeat',
          height: 24,
          width: 24,
          left: 10,
          top: 10,
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#393939' : '#001e3c',
    width: 24,
    height: 24,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // Left Selected
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.295857 7.58664C-0.0456849 7.89285 0.170919 8.45893 0.62963 8.45893H0.96352C1.5158 8.45893 1.96352 8.90664 1.96352 9.45893V17.2948C1.96352 17.837 1.52397 18.2765 0.98176 18.2765H0.846340C0.378921 18.2765 0 18.6555 0 19.1229C0 19.5903 0.37892 19.9692 0.846343 19.9692H17.4347C17.9021 19.9692 18.281 19.5903 18.281 19.1229C18.281 18.6555 17.9021 18.2765 17.4347 18.2765H17.2993C16.7571 18.2765 16.3175 17.837 16.3175 17.2948V9.45893C16.3175 8.90664 16.7652 8.45893 17.3175 8.45893H17.6514C18.1101 8.45893 18.3267 7.89285 17.9852 7.58664L9.80807 0.25543C9.4282 -0.0851437 8.85285 -0.0851433 8.47298 0.255431L0.295857 7.58664ZM9.14048 8.459C8.57958 8.459 8.12487 8.91371 8.12487 9.47462V17.5995C8.12487 18.1604 8.57958 18.6151 9.14048 18.6151C9.70139 18.6151 10.1561 18.1604 10.1561 17.5995V9.47461C10.1561 8.91371 9.70139 8.459 9.14048 8.459ZM12.1874 9.47462C12.1874 8.91371 12.6421 8.459 13.203 8.459C13.7639 8.459 14.2186 8.91371 14.2186 9.47461V17.5995C14.2186 18.1604 13.7639 18.6151 13.203 18.6151C12.6421 18.6151 12.1874 18.1604 12.1874 17.5995V9.47462ZM5.07803 8.459C4.51712 8.459 4.06242 8.91371 4.06242 9.47462V17.5995C4.06242 18.1604 4.51712 18.6151 5.07803 18.6151C5.63894 18.6151 6.09365 18.1604 6.09365 17.5995V9.47461C6.09365 8.91371 5.63894 8.459 5.07803 8.459Z" fill="${encodeURIComponent(
        '#fff'
      )}"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    padding: 3,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${alpha('#AEAEC0', 0.5)}`,
    borderRadius: 60 / 2,

    '&:before': {
      position: 'absolute',
      content: "''",
      // Right Unselected
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6.85714" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2"/><circle cx="11" cy="11" r="4.5" stroke="${encodeURIComponent(
        '#000'
      )}"/><path d="M11 1V3.85714" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M21 11L18.1429 11" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M11 18.1429V21" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M3.85718 11L1.0003 11" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M19.6604 6L17.186 7.42857" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M4.81421 14.5714L2.33985 16" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M2.3396 6L4.81396 7.42857" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M17.1858 14.5714L19.6601 16" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M16 2.33972L14.5714 4.81408" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M7.42847 17.1859L5.9999 19.6603" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M6 2.33972L7.42857 4.81408" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/><path d="M14.5715 17.1859L16.0001 19.6603" stroke="${encodeURIComponent(
        '#000'
      )}" stroke-width="2" stroke-linecap="round"/></svg>')`,
      backgroundRepeat: 'no-repeat',
      height: 24,
      width: 24,
      right: -5,
      top: 10,
    },
  },
}));

const NavigationSwitchMobile = forwardRef(({ value, onChange = () => {}, ...props }, ref) => (
  <NavigationSwitchComponent ref={ref} value={value} onChange={onChange} {...props} />
));

export default NavigationSwitchMobile;
