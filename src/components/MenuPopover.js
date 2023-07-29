import get from 'lodash/get';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Popover } from '@mui/material';

/** ---------------------------------------------------------------------- */

const ArrowStyle = styled('span')(({ bg, arrow, theme }) => {
  const SIZE = 12;

  const POSITION = -(SIZE / 2);

  const borderStyle = `solid 1px ${get(theme.palette, bg) || theme.palette.background.popover}`;

  const topStyle = {
    borderRadius: '0 0 3px 0',
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  };
  const bottomStyle = {
    borderRadius: '3px 0 0 0',
    bottom: POSITION,
    borderTop: borderStyle,
    borderLeft: borderStyle,
  };
  const leftStyle = {
    borderRadius: '0 3px 0 0',
    left: POSITION,
    borderTop: borderStyle,
    borderRight: borderStyle,
  };
  const rightStyle = {
    borderRadius: '0 0 0 3px',
    right: POSITION,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
  };

  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      zIndex: 1,
      width: SIZE,
      height: SIZE,
      content: "''",
      position: 'absolute',

      transform: 'rotate(-135deg)',
      backgroundColor: get(theme.palette, bg) || theme.palette.background.popover,
    },
    // Top
    ...(arrow === 'top-left' && { ...topStyle, left: 20 }),
    ...(arrow === 'top-center' && { ...topStyle, left: 0, right: 0, margin: 'auto' }),
    ...(arrow === 'top-right' && { ...topStyle, right: 20 }),
    // Bottom
    ...(arrow === 'bottom-left' && { ...bottomStyle, left: 20 }),
    ...(arrow === 'bottom-center' && { ...bottomStyle, left: 0, right: 0, margin: 'auto' }),
    ...(arrow === 'bottom-right' && { ...bottomStyle, right: 20 }),
    // Left
    ...(arrow === 'left-top' && { ...leftStyle, top: 20 }),
    ...(arrow === 'left-center' && { ...leftStyle, top: 0, bottom: 0, margin: 'auto' }),
    ...(arrow === 'left-bottom' && { ...leftStyle, bottom: 20 }),
    // Right
    ...(arrow === 'right-top' && { ...rightStyle, top: 20 }),
    ...(arrow === 'right-center' && { ...rightStyle, top: 0, bottom: 0, margin: 'auto' }),
    ...(arrow === 'right-bottom' && { ...rightStyle, bottom: 20 }),
  };
});

/** ---------------------------------------------------------------------- */

MenuPopover.propTypes = {
  bg: PropTypes.string,
  sx: PropTypes.object,
  children: PropTypes.node,
  disabledArrow: PropTypes.bool,
  arrow: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ]),
};

export default function MenuPopover({ bg, children, arrow = 'top-right', disabledArrow, sx, ...other }) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 'auto',
          overflow: 'inherit',
          backgroundColor: bg || 'background.popover',
          backgroundImage: 'none',
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <ArrowStyle arrow={arrow} bg={bg} />}

      {children}
    </Popover>
  );
}
