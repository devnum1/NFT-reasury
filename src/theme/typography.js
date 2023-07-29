import { pxToRem, responsiveFontSizes } from '../utils/getFontValue';
import { THEME } from '../config';

// ----------------------------------------------------------------------

const FONT_PRIMARY = THEME.fontFamily;

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.6,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.6,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.6,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  title40: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(40),
  },
  title30: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(30),
  },
  title20: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(20),
  },
  title6040: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 60, md: 60, lg: 60 }),
  },
  title4025: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(25),
    ...responsiveFontSizes({ sm: 40, md: 40, lg: 40 }),
  },
  title3020: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 30, md: 30, lg: 30 }),
  },
  title2012: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 14, md: 20, lg: 20 }),
  },
  title2010: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 20 }),
  },
  text1412: {
    lineHeight: 1.2,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 14 }),
  },
  text1210: {
    lineHeight: 1.2,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 12, md: 12, lg: 12 }),
  },
  text1410: {
    lineHeight: 1.2,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 14, md: 14, lg: 14 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.6,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 1.2,
    fontSize: pxToRem(14),
  },
  responsiveBody2: {
    lineHeight: 1.2,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 14 }),
  },
  body3: {
    lineHeight: 1.2,
    fontSize: pxToRem(13),
  },
  body4: {
    lineHeight: '14px',
    fontSize: pxToRem(11),
  },
  body5: {
    lineHeight: '13px',
    fontSize: pxToRem(10),
  },
  caption: {
    lineHeight: 1.6,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.6,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

export default typography;
