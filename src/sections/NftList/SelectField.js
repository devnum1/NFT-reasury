/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  '.MuiInputBase-root': {
    width: '100%',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  border: 'none',
  boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
  width: 220,

  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const SubLabel = styled(Box)(({ theme }) => ({
  fontSize: '10px',
  backgroundColor: theme.palette.grey[300],
  padding: theme.spacing(0.2, 1),
  borderRadius: theme.spacing(1),
}));

export default function SelectField({ options = [], value, onChange, disabled }) {
  return (
    <RootStyle>
      <FormControl fullWidth>
        <CustomSelect
          labelId="sort-by"
          id="sort-by"
          value={value}
          label="Age"
          onChange={onChange}
          disabled={disabled}
          MenuProps={{
            sx: {
              mt: 1,
            },
            BackdropProps: {
              className: 'select-backdrop',
            },
          }}
        >
          {options.map((option, key) => (
            <MenuItem value={option?.value} key={key} disabled={option?.disabled}>
              <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                {option?.label}
                {option?.subLabel && <SubLabel>{option?.subLabel}</SubLabel>}
              </Box>
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </RootStyle>
  );
}
