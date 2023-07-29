/* eslint-disable react/prop-types */
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';
import { styled } from '@mui/material/styles';
import { Box, CardActionArea, CircularProgress, IconButton } from '@mui/material';
import { memo, useMemo, useRef, useState } from 'react';
import useResponsive from 'src/hooks/useResponsive';
import Iconify from 'src/components/Iconify';
import { refreshListSelector } from 'src/redux/slices/refreshList';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  minHeight: 490,
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(6),
    minHeight: 300,
  },

  '.StackedSliders': {
    overflow: 'auto !important',
    overflowX: 'hidden !important',
    overflowY: 'visible !important',
  },
}));

const SliderNavigation = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 'calc(100% + 20px)',
  bottom: 'calc(50% - 10px)',
  left: '-10px',

  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% + 80px)',
    bottom: 'calc(50% - 20px)',
    left: '-40px',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    left: 0,
    position: 'relative',
    maxWidth: '120px',
    marginTop: theme.spacing(2.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  '.navigation': {
    height: 60,
    width: 60,

    [theme.breakpoints.down('md')]: {
      height: 50,
      width: 50,
    },

    '.navIcon': {
      width: 20,
      height: 20,

      [theme.breakpoints.down('md')]: {
        width: 15,
        height: 15,
      },
    },
  },
}));

const NftBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  border: `5px solid ${theme.palette.common.white}`,
  height: 450,
  width: 370,
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(5),
  boxShadow: `0px 20px 20px ${theme.palette.shadow.bottomRight}`,
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    maxWidth: 246,
    height: 300,
  },
}));

const Slide = memo((props) => {
  const { data, dataIndex, onSelect, isCenterSlide, slideIndex, swipeTo } = props;
  const nft = data[dataIndex];

  const handleClick = () => {
    if (isCenterSlide) {
      onSelect(nft);
      return;
    }
    return swipeTo(slideIndex);
  };

  return (
    <NftBox key={nft?.id}>
      <CardActionArea sx={{ height: '100%' }} onClick={handleClick}>
        <Box
          style={{ backgroundImage: `url('${nft?.image}')` }}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
          }}
        />
      </CardActionArea>
    </NftBox>
  );
});

export default function NftSlider({ data = [], onSelect, loading }) {
  const { isLoading } = useSelector(refreshListSelector);
  const ref = useRef();
  const isMobile = useResponsive('down', 'sm');
  const [centerSlideDataIndex, setCenterSlideDataIndex] = useState(0);
  const onCenterSlideDataIndexChange = (newIndex) => {
    setCenterSlideDataIndex(newIndex);
  };

  const maxSlides = data.length < 3 ? 1 : data.length < 5 ? 3 : 5;
  const customScales = useMemo(() => {
    if (maxSlides === 1) return [1, 0.7];
    if (maxSlides === 3) return [1, 0.7, 0.5];
    return [1, 0.7, 0.5, 0.3];
  }, [maxSlides]);

  return (
    <RootStyle>
      {!loading && data.length >= maxSlides ? (
        <ResponsiveContainer
          carouselRef={ref}
          className="resContainer"
          render={(width, carouselRef) => (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={(props) => <Slide onSelect={onSelect} {...props} />}
              slideWidth={isMobile ? 246 : 370}
              carouselWidth={width}
              data={data}
              maxVisibleSlide={maxSlides}
              customScales={customScales}
              transitionTime={450}
              height={(!isMobile ? 450 : 300) + 40}
              onActiveSlideChange={onCenterSlideDataIndexChange}
              className="StackedSliders"
            />
          )}
        />
      ) : (
        <Box
          sx={{ width: '100%', minHeight: 450, py: 10 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <SliderNavigation>
        <IconButton variant="default" className="navigation prev" type="button" onClick={() => ref.current?.goBack()}>
          <Iconify icon="nft:prev" className="navIcon" />
        </IconButton>
        <IconButton variant="default" className="navigation next" type="button" onClick={() => ref.current?.goNext()}>
          <Iconify icon="nft:next" className="navIcon" />
        </IconButton>
      </SliderNavigation>
    </RootStyle>
  );
}
