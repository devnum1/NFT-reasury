import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar } from '@mui/material';

/** ---------------------------------------------------------------------- */

const Avatar = forwardRef(({ color = 'default', children, sx, ...other }, ref) => {
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  if (color === 'default') {
    return (
      <MUIAvatar ref={ref} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }

  if (color === 'main') {
    return (
      <MUIAvatar
        ref={ref}
        sx={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.avatar, ...sx }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  }

  return (
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: themeMode === 'dark' ? theme.palette[color].main : theme.palette[color].light,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
});

Avatar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error', 'main']),
};

export default Avatar;
