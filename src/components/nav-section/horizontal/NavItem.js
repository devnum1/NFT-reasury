import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import isFunction from 'lodash/isFunction';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';
// config
import { ICON } from 'src/config';
//
import Iconify from 'src/components/Iconify';
import { ListItemStyle } from './style';
import { isExternalLink } from 'src/components/nav-section';

/** ---------------------------------------------------------------------- */

export const NavItemRoot = forwardRef(({ item, active, open, onMouseEnter, onMouseLeave, onClick }, ref) => {
  const { title, path, icon, children } = item;

  if (isFunction(onClick)) {
    return (
      <ListItemStyle activeRoot={active} onClick={onClick}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  if (children) {
    return (
      <ListItemStyle ref={ref} open={open} activeRoot={active} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  ) : (
    <NextLink href={path} passHref>
      <ListItemStyle activeRoot={active}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    </NextLink>
  );
});

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

/** ---------------------------------------------------------------------- */

export const NavItemSub = forwardRef(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <ListItemStyle
        ref={ref}
        subItem
        disableRipple
        open={open}
        activeSub={active}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle subItem href={path} disableRipple rel="noopener" target="_blank" component={Link}>
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  ) : (
    <NextLink href={path} passHref>
      <ListItemStyle disableRipple activeSub={active} subItem>
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    </NextLink>
  );
});

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

/** ---------------------------------------------------------------------- */

NavItemContent.propTypes = {
  children: PropTypes.array,
  icon: PropTypes.any,
  subItem: PropTypes.bool,
  title: PropTypes.string,
};

function NavItemContent({ icon, title, children, subItem }) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mb: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
