// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 72,
  MAIN_DESKTOP_HEIGHT: 126,
  DASHBOARD_DESKTOP_HEIGHT: 96,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 96,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 276,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_MOBILE_HEIGHT: 108,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// ----------------------------------------------------------------------

export const cookiesExpires = 3;

export const cookiesKey = {
  themeMode: '__nftr-thm',
};

export const defaultSettings = {
  themeMode: 'light',
  themeColorPresets: 'default',
};

// THEME
export const THEME = {
  googleFont: 'Poppins',
  fontFamily: 'Poppins, sans-serif',
};

// WORDING
// ----------------------------------------------------------------------

export const WORDING = {
  title: 'theNFtreasury',
  seoTitle: 'theNFtreasury - Infinitely Expanding NFTs',
  seoDescription:
    'A revolutionary DAO that brings profit to all who use it. We use the Polygon blockchain and revolutionary smart contracts to automatically increase the value of your crystal once you buy it, so you can then sell it right away for a profit.',
  author: 'theNFtreasury',
  metaKeywords: 'nft, dao, infinite expanding nfts',
};

// API

const API_HOSTS = {
  PEXELS: 'https://api.pexels.com/v1',
};

export const API_PATH = {
  PROFILE: '/api/me',
  PEXELS: {
    SEARCH: `${API_HOSTS.PEXELS}/search`,
  },
};

export const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export const ACCESS_TOKEN_KEY = '__nftr';
export const JWT_SECRET = 'NFTreasury';

export const THIRDWEB = {
  provider: 'tw:provider:connectors',
};

export const COOKIE_KEYS = {
  provider: '__nftt-provider'
}

export const alchemySettings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: process.env.NEXT_PUBLIC_ALCHEMY_NETWORK,
};
