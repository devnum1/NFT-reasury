import numeral from 'numeral';
import take from 'lodash/take';

/** ---------------------------------------------------------------------- */

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fCurrencyDecimal(number) {
  return numeral(number).format('$0,0.00');
}

export function fShortCurrency(number) {
  return numeral(number).format('$0,0a');
}

export function fPercent(number) {
  return numeral(number / 100).format('0,0%');
}

export function fPercentDecimal(number) {
  return numeral(number / 100).format('0,0.00%');
}
export function fPercentDecimal3(number) {
  return numeral(number / 100).format('0,0.000%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function autoFormat(number) {
  const isInteger = Number.isInteger(number);
  const initialFormat = isInteger ? '0,0' : '0,0.00';
  const format = number < 0.001 && number > 0 ? '0,0.000000' : initialFormat;
  return numeral(number).format(format);
}

export function autoCurrency(number) {
  const isInteger = Number.isInteger(number);
  const initialFormat = isInteger ? '$0,0' : '$0,0.00';
  const format = number < 0.001 && number > 0 ? '$0,0.000000' : initialFormat;
  return numeral(number).format(format, (n) => ~~n);
}

export function decimalPrecision(number, precision = '00') {
  return numeral(number).format(`0,0.${precision}`, (n) => ~~n);
}

export function limitDecimal(stringNumber, limit) {
  const x = stringNumber.split('.');
  if (x.length > 1) {
    x[1] = x[1].substring(0, limit);
    const newString = x.join('.');
    const newFloat = parseFloat(newString);
    return newFloat.toString();
  }
  return stringNumber;
}
