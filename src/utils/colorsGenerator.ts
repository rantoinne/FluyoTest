// import { useColorScheme } from 'react-native';
import { COLOR_CODES_FOR_DARK_THEME, COLOR_CODES_FOR_LIGHT_THEME } from './enums';
import { COLOR_CODE_TYPE } from './types';

/**
 * @returns {COLOR_CODES_FOR_DARK_THEME | COLOR_CODES_FOR_LIGHT_THEME} based on theme
 */
export const getCurrentTheme
  = (): typeof COLOR_CODES_FOR_DARK_THEME | typeof COLOR_CODES_FOR_LIGHT_THEME => {
    // const isDarkThemeActive = useColorScheme() === 'dark';
    const isDarkThemeActive = false;
    return isDarkThemeActive ? COLOR_CODES_FOR_DARK_THEME : COLOR_CODES_FOR_LIGHT_THEME;
};

/**
 * @description Method to get default colors
 * based on theme
 * @returns [COLOR, COLOR]
 */
export const getGradientColors = (): COLOR_CODE_TYPE[] => {
  const currentThemePalette = getCurrentTheme();
  
  return [currentThemePalette.SHADOW, currentThemePalette.OUTLINE];
};

/**
 * @returns A color palette with current
 * theme selected
 */
export const THEME = getCurrentTheme();
