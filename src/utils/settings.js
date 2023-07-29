// config
import { defaultSettings, cookiesKey } from '../config';

// ----------------------------------------------------------------------

export const getSettings = (cookies) => {
  const themeMode = getData(cookies[cookiesKey.themeMode]) || defaultSettings.themeMode;

  const themeColorPresets = getData(cookies[cookiesKey.themeColorPresets]) || defaultSettings.themeColorPresets;


  return {
    themeMode,
    themeColorPresets,
  };
};

// ----------------------------------------------------------------------

const getData = (value) => {
  if (value === 'true' || value === 'false') {
    return JSON.parse(value);
  }
  if (value === 'undefined' || !value) {
    return '';
  }
  return value;
};
