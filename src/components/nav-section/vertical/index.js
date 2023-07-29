import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton, Link, List, ListSubheader, Typography } from '@mui/material';
//
import { NavListRoot } from './NavList';

/** ---------------------------------------------------------------------- */

// eslint-disable-next-line no-unused-vars
export const ListSubheaderStyle = styled(({ isFirstElement, ...props }) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ isFirstElement, theme }) => ({
  ...theme.typography.overline,
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(2.5),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  ...(isFirstElement && {
    borderTop: 'none',
  }),
}));

export const ListStyle = styled((props) => <List disablePadding {...props} />)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

/** ---------------------------------------------------------------------- */

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
  socialConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, socialConfig, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((group, groupIndex) => (
        <ListStyle key={groupIndex} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            isFirstElement={groupIndex === 0}
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </ListStyle>
      ))}
      {socialConfig && (
        <Box sx={{ py: 15, px: 3.25 }}>
          <Typography variant="body2" fontWeight={700}>
            Find us
          </Typography>
          {socialConfig.map((soc) => (
            <IconButton
              key={`soc.${soc?.title}`}
              sx={{ '&:hover': { color: 'text.primary' } }}
              aria-label={soc?.title}
              component={Link}
              href={soc?.path}
              target="_blank"
              rel="noopener"
            >
              {soc?.icon}
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
}
