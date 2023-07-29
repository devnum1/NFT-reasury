import PropTypes from 'prop-types';
// @mui
import { styled, keyframes, alpha } from '@mui/material/styles';


const shine = keyframes`
  to {
    backgroundSize: '80% center';
  }
`;

const Gradient = styled('span')(({ theme }) => ({
  backgroundImage: `linear-gradient(95.75deg, ${alpha(theme.palette.primary.main, 0.8)} -9.03%, ${theme.palette.primary.main} 56.14%, ${theme.palette.primary.dark} 130.01%)`,
  animation: `${shine} 0.5s linear ease`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const GradientText = ({ children, sx, ...other }) => (
  <Gradient sx={{ ...sx }} {...other}>
    {children}
  </Gradient>
);

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default GradientText;
