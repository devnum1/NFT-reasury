import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const VerticalBox = styled(Box)(({ theme, gap = 0 }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(gap),
}));

export const HorizontalBox = styled(Box)(({ theme, gap = 0 }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(gap),
}));

export const HorizontalBetween = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(2.5)
  }
}));
