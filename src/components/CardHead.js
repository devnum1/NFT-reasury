/* eslint-disable react/prop-types */
// @mui
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
// components
import Iconify from './Iconify';
import PaperHead from './PaperHead';

export default function CardHead({ title, value, suffix, tooltip }) {
  return (
    <PaperHead>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip} arrow placement="top">
            <IconButton component="a" size="small" sx={{ color: 'text.primary' }}>
              <Iconify icon="kei:info-circle" sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <Typography variant="h4">{value}</Typography>
        {suffix && (
          <Typography variant="body2" color="text.secondary">
            {suffix}
          </Typography>
        )}
      </Box>
    </PaperHead>
  );
}
