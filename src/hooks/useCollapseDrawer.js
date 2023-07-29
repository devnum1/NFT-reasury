import { useContext } from 'react';
import { CollapseDrawerContext } from 'src/contexts/CollapseDrawerContext';

/** ---------------------------------------------------------------------- */

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
