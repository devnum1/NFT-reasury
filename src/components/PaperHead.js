/* eslint-disable react/prop-types */
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

const RootStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3, 1.25, 3),
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
}));
export default function PaperHead({ children }) {
  return <RootStyle>{children}</RootStyle>;
}
