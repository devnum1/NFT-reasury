import PropTypes from 'prop-types';
// components
import MainLayout from './main';
import DashboardLayout from './dashboard';

/** ---------------------------------------------------------------------- */

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackUrl: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly']),
  withBackButton: PropTypes.bool,
};

export default function Layout({ variant = 'dashboard', children, fallbackUrl, title, withBackButton }) {
  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    <DashboardLayout title={title} fallbackUrl={fallbackUrl} withBackButton={withBackButton}>
      {children}
    </DashboardLayout>
  );
}
