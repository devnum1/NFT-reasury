import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// config
import { WORDING } from 'src/config';
import NextImage from './NextImage';
import MainLogo from 'src/images/nftreasury.png'

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: 204,
  height: 40,
  [theme.breakpoints.down('sm')]: {
    width: 125,
    height: 25,
  },
  
  '.LogoImage': {
    height: 40,
    width: 204,
    [theme.breakpoints.down('sm')]: {
      width: 125,
      height: 25,
    },
  }
}));

// eslint-disable-next-line react/prop-types
const Logo = forwardRef(({ disabledLink = false, sx, href = '/' }, ref) => {
  const logo = (
    <ImageWrapper ref={ref} sx={{ cursor: 'pointer', ...sx }}>
      <NextImage src={MainLogo} alt={WORDING.title} className="LogoImage" />
    </ImageWrapper>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href={href}>{logo}</NextLink>;
});

export default Logo;
