/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
// // utils
import { limitDecimal } from 'src/utils/formatNumber';

const NumberFormatComponent = forwardRef(({ value, onChange = () => {}, ...props }, ref) => (
  <NumberFormat
    type="text"
    getInputRef={ref}
    allowNegative={false}
    isNumericString
    onValueChange={(values) => {
      if (values) onChange(limitDecimal(values?.value, 6));
    }}
    value={value}
    thousandSeparator
    allowLeadingZeros
    decimalSeparator="."
    {...props}
  />
));

export default NumberFormatComponent;
