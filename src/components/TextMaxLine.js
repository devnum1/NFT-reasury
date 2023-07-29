import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Typography, Link, Tooltip } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// utils
import GetFontValue from 'src/utils/getFontValue';

// ----------------------------------------------------------------------

const TextMaxLine = forwardRef(
  ({ asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }, ref) => {
    const isMobile = useResponsive('down', 'sm');
    const { lineHeight } = GetFontValue(variant);

    const style = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    };

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...style }} {...other}>
          {children}
        </Link>
      );
    }
    if (children?.length > 20 && isMobile) {
      return (
        <Tooltip title={children} placement="top" arrow>
          <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
            {children}
          </Typography>
        </Tooltip>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

TextMaxLine.propTypes = {
  asLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
  line: PropTypes.number,
  persistent: PropTypes.bool,
  sx: PropTypes.object,
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
  ]),
};

export default TextMaxLine;
