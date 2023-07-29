import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Badge, Box, Button, Container } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { animateScroll } from 'react-scroll';

import { pxToRem } from 'src/utils/getFontValue';

import useResponsive from 'src/hooks/useResponsive';
import MyCollection from './MyCollection';
import SelectField from 'src/sections/NftList/SelectField';
import ForSale from './ForSale';
import { findIndex } from 'lodash';
import Favorites from './Favorites';

const RootStyle = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(4.5),

  '.FilterButton': {
    minWidth: 116,
    fontSize: pxToRem(14),
    fontWeight: 'normal',
    padding: theme.spacing(1.25),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },

  '.swipeable': {
    [theme.breakpoints.down('sm')]: {
      overflow: 'visible !important',
    },
  },
  '.TabPanel': {
    overflow: 'visible',
  },

  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, -2, 0, -2),
  },
}));

const SearchHeader = styled('section')(({ theme }) => ({
  padding: theme.spacing(0, 2, '30px', 2),
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
}));

const TabPanelStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflow: 'visible',
}));

const SubLabel = styled(Box)(({ theme }) => ({
  fontSize: '10px',
  backgroundColor: theme.palette.grey[300],
  padding: theme.spacing(0.2, 1),
  borderRadius: theme.spacing(1),
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <TabPanelStyle
      role="tabpanel"
      hidden={value !== index}
      id={`profile-content-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      className="TabPanel"
      {...other}
    >
      {value === index && children}
    </TabPanelStyle>
  );
}

const categories = [
  { label: 'My Collection', value: 'My Collection' },
  { label: 'For Sale', value: 'For Sale' },
  { label: 'Favourites', value: 'Favourites' },
  { label: 'Notifications', subLabel: 'Coming Soon', value: 'Notifications', disabled: true },
];

const sorting = [
  { label: 'Price (Highest)', value: 1 },
  { label: 'Price (Lowes)', value: 2 },
];

const PAGE_SIZE = 12;

const listFetcher = (url) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data?.data || [];
  });

export default function ProfileTabs({ selectNft = () => {}, user, refresh, selectTab }) {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('My Collection');
  const isSmallScreen = useResponsive('down', 'md');

  const handleSwipe = (newValue) => {
    // console.log({ newValue });
    setTab(newValue);
    selectTab(newValue);
    animateScroll.scrollToTop({ duration: 0 });
  };

  return (
    <RootStyle>
      <Container>
        <Box display="flex" flexDirection="column" gap={'30px'} sx={{ paddingBottom: 4 }}>
          <SearchHeader>
            {isSmallScreen ? (
              <SelectField
                options={categories}
                value={filter}
                onChange={(e) => {
                  console.log(e?.target?.value);
                  setFilter(e?.target?.value);
                  const selectedIndex = findIndex(categories, { label: e?.target?.value });
                  handleSwipe(selectedIndex);
                }}
              />
            ) : (
              <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
                {categories.map((category, key) => (
                  <Button
                    variant={tab === key ? 'default' : 'plain'}
                    key={category?.value}
                    className="FilterButton"
                    type="button"
                    disabled={category?.disabled}
                    onClick={() => {
                      setTab(key);
                      selectTab(key);
                    }}
                  >
                    <Box component="span" display="flex" flexDirection="row" gap={1} alignItems="center">
                      {category?.label}
                      {category?.subLabel && <SubLabel>{category?.subLabel}</SubLabel>}
                    </Box>

                    {/* {category?.count > 0 && (
                      <Box component="span" sx={{ color: 'text.secondary' }}>
                        {fNumber(category?.count)}
                      </Box>
                    )} */}
                  </Button>
                ))}
              </Box>
            )}
          </SearchHeader>
          <SwipeableViews index={tab} onChangeIndex={handleSwipe} className="swipeable">
            <TabPanel value={tab} index={0} name="My Collection">
              <MyCollection selectNft={selectNft} user={user} refresh={refresh} />
            </TabPanel>
            <TabPanel value={tab} index={1} name="For Sale">
              <ForSale selectNft={selectNft} user={user} refresh={refresh} />
            </TabPanel>
            <TabPanel value={tab} index={2} name="Favorites">
              <Favorites selectNft={selectNft} user={user} refresh={refresh} />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </RootStyle>
  );
}
