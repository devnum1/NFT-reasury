import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { NavListRoot } from './NavList';
/** config */
import { NAVBAR } from 'src/config';
import MoreMenuPopover from './MoreMenuPopover';

/** ---------------------------------------------------------------------- */

// const hideScrollbar = {
//   msOverflowStyle: 'none',
//   scrollbarWidth: 'none',
//   overflowY: 'scroll',
//   '&::-webkit-scrollbar': {
//     display: 'none',
//   },
// };

NavSectionHorizontal.propTypes = {
  navConfig: PropTypes.object,
  navSocialConfig: PropTypes.array,
};

function NavSectionHorizontal({ navConfig, navSocialConfig }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      sx={{ bgcolor: 'background.nav', height: NAVBAR.DASHBOARD_MOBILE_HEIGHT, px: 4, py: 2 }}
    >
      <Box display="flex" flexDirection="row">
        {navConfig?.main?.items.map((list) => (
          <NavListRoot key={list.title} list={list} />
        ))}
        <MoreMenuPopover navConfig={navConfig?.more} navSocialConfig={navSocialConfig} />
      </Box>
    </Box>
  );
}

export default memo(NavSectionHorizontal);
