import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import { Box } from '@mui/material';
// utils
import { getRatio } from 'src/utils/image';

/** ---------------------------------------------------------------------- */

Image.propTypes = {
  className: PropTypes.string,
  disabledEffect: PropTypes.bool,
  withoutPlaceholder: PropTypes.bool,
  effect: PropTypes.string,
  placeholderSrc: PropTypes.string,
  ratio: PropTypes.oneOf(['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1', '21/4']),
  sx: PropTypes.object,
};

export default function Image({
  ratio,
  disabledEffect = false,
  effect = 'blur',
  sx,
  withoutPlaceholder,
  placeholderSrc,
  className,
  ...other
}) {
  if (ratio) {
    return (
      <Box
        component="span"
        className={className}
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <Box
          component={LazyLoadImage}
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc={!withoutPlaceholder ? '' : placeholderSrc || '/img/img_placeholder.svg'}
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
          {...other}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      className={className}
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={!withoutPlaceholder ? '' : '/img/img_placeholder.svg'}
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    </Box>
  );
}

/** ---------------------------------------------------------------------- */
