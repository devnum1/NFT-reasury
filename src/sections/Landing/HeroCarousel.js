import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

import { MotionContainer, varFade } from 'src/components/animate';
import NftSlider from './NftSlider';

const RootStyle = styled('section')(({ theme }) => ({
  paddingTop: '180px',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  background: 'url(/img/bg-hero.png) no-repeat',
  backgroundSize: '100% 550px',
  backgroundPosition: 'top',
  // backgroundAttachment: 'fixed',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    minHeight: 550,
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '80px',
  },
}));

const HeroCarousel = ({ onSelect, nfts, loading }) => (
  <RootStyle>
    <Container component={MotionContainer}>
      <m.div variants={varFade({ distance: 60 }).inDown}>
        <Typography variant="title6040" align="center" component="h1">
          Infinitely Expanding NFTs
        </Typography>
      </m.div>
      <m.div variants={varFade({ distance: 60 }).inUp}>
        <Typography
          variant="title3020"
          align="center"
          fontWeight="regular"
          component="h2"
          mt={2.5}
          color="text.tertiary"
        >
          earn with every trade
        </Typography>
      </m.div>
      <NftSlider data={nfts} onSelect={onSelect} loading={loading} />
    </Container>
  </RootStyle>
);

export default HeroCarousel;
