/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Container, Grid, IconButton, Typography } from '@mui/material';

import Image from 'src/components/Image';
import { decimalPrecision } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';
import Avatar from 'src/components/Avatar';
import useAuth from 'src/hooks/useAuth';
import NextImage from 'src/components/NextImage';

const RootStyle = styled('section')(({ theme }) => ({
  padding: theme.spacing('180px', 0, '100px'),
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

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing('120px', 0, '30px'),
  },

  '.CrystalImage': {
    borderRadius: '20px',
  },
}));

const DetailBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing('20px'),
  minHeight: '300px',
}));

const Vertical40 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing('40px'),
}));

const Vertical10 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing('10px'),

  '.description': {
    color: theme.palette.text.tertiary,
    minHeight: '60px',
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing('10px'),
  minHeight: 50,
  padding: theme.spacing('10px', '20px'),
}));

const CrystalImageWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  right: '20px',
  top: '10px',
  [theme.breakpoints.down('sm')]: {
    top: '20px',
  },
}));

const avatarSize = 30;

const HeroNftDetail = ({ nft, onClose, isSelling }) => {
  const { user } = useAuth();
  return (
    <RootStyle>
      <Container>
        <Card variant="default" sx={{ borderRadius: '40px' }}>
          <DetailBox>
            <Grid container spacing={'20px'}>
              <Grid item xs={12} md={4}>
                <CrystalImageWrapper>
                  <NextImage src={nft?.image} alt={nft?.name} className="CrystalImage" width={357} height={357} />
                </CrystalImageWrapper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Vertical40>
                  <Vertical10 sx={{ mt: 3 }}>
                    <Typography variant="title4025" component="h1">
                      {nft?.name}
                    </Typography>
                    <Typography variant="text1412" component="p" className="description">
                      {nft?.description}
                    </Typography>
                  </Vertical10>
                  <Grid container spacing={'30px'}>
                    <Grid item xs={12} sm={6}>
                      <Vertical10>
                        <Typography variant="text1412" component="h5" color="text.tertiary" fontWeight={500}>
                          Owned by
                        </Typography>
                        <Card variant="default">
                          <InfoBox>
                            <Avatar sx={{ height: avatarSize, width: avatarSize }}>
                              <Image
                                src={isSelling ? user?.avatar?.small : nft?.owner?.avatar?.small}
                                alt={nft?.owner?.username || '--'}
                                width={avatarSize}
                                ratio="1/1"
                                height={avatarSize}
                                placeholderSrc={isSelling ? user?.avatar?.tiny : nft?.avatar?.tiny}
                                sx={{ width: avatarSize, height: avatarSize }}
                              />
                            </Avatar>
                            {isSelling ? (
                              <Typography variant="text1412" component="h5" sx={{ pt: 1 }}>
                                {user?.username ? `@${user?.username}` : '--'}
                              </Typography>
                            ) : (
                              <Typography variant="text1412" component="h5" sx={{ pt: 1 }}>
                                {nft?.owner?.username ? `@${nft?.owner?.username}` : '--'}
                              </Typography>
                            )}
                          </InfoBox>
                        </Card>
                      </Vertical10>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Vertical10>
                        <Typography variant="text1412" component="h5" color="text.tertiary" fontWeight={500}>
                          Collection
                        </Typography>
                        <Card variant="default">
                          <InfoBox>
                            <Typography variant="text1412" component="h5" sx={{ pt: 1 }}>
                              {nft?.category}
                            </Typography>
                          </InfoBox>
                        </Card>
                      </Vertical10>
                    </Grid>
                  </Grid>
                  {isSelling ? (
                    <Grid container spacing={'30px'}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ height: 56, alignSelf: 'center' }}
                        >
                          <Box display="flex" flexDirection="row" gap={1} justifySelf="center">
                            <Typography variant="responsiveBody2" color="text.secondary">
                              Bought for:
                            </Typography>
                            <Typography variant="responsiveBody2" fontWeight={600}>
                              {decimalPrecision(nft?.price, '000')} {nft?.currency}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      {nft?.isCancel ? (
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="gradient"
                            sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                          >
                            <span>Cancel</span>
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="gradient"
                            sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                          >
                            <span>Sell Now</span>
                            <Iconify icon="akar-icons:arrow-right" />
                            <span>
                              {decimalPrecision(nft?.sell_price, '000')} {nft?.currency}
                            </span>
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Grid container spacing={'30px'}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="gradient"
                          sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                        >
                          <span>Buy Now</span>
                          <Iconify icon="akar-icons:arrow-right" />
                          <span>
                            {decimalPrecision(nft?.price, '000')} {nft?.currency}
                          </span>
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                          <Box display="flex" flexDirection="row" gap={1} justifySelf="center">
                            <Typography variant="responsiveBody2" color="text.secondary">
                              Sell for:
                            </Typography>
                            <Typography variant="responsiveBody2" fontWeight={600}>
                              {decimalPrecision(nft?.sell_price, '000')} {nft?.currency}
                            </Typography>
                          </Box>
                          <IconButton
                            variant="default"
                            sx={{ height: 50, width: 50, minWidth: 0, borderRadius: '15px' }}
                          >
                            <Iconify icon="nft:heart" sx={{ width: 16, height: 16 }} />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Vertical40>
              </Grid>
            </Grid>
            <CloseButton type="button" aria-label="close-button" onClick={onClose}>
              <Iconify icon="clarity:close-line" />
            </CloseButton>
          </DetailBox>
        </Card>
      </Container>
    </RootStyle>
  );
};

export default HeroNftDetail;
