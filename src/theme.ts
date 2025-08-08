import React, { useContext } from 'react';
import { DeepPartial } from './types';

export type ThemeName = 'light' | 'dark';
export const ThemeContext = React.createContext<ThemeName | DeepPartial<Theme>>('light');
type Themes = { [key in ThemeName]: Theme };

export type Theme = {
  colors: {
    background: string;
    link: string;
    card: string;
    text: string;
    statusGood: string;
    statusWarning: string;
    statusBad: string;
    secondary: string;
    onSecondary: string;
    muted: string;
  };
};

const darkTheme: Theme = {
  colors: {
    background: '#2d2a28',
    link: '#0077ff',
    card: '#3a3a3c',
    text: '#ffffff',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    secondary: '#2c7489',
    onSecondary: '#ffffff',
    muted: '#cccccc',
  },
};

const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    link: '#0077ff',
    card: '#f1f5f9',
    text: '#000000',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    secondary: '#2c7489',
    onSecondary: '#ffffff',
    muted: '#757575',
  },
};

const themes: Themes = {
  dark: darkTheme,
  light: lightTheme,
};

export const useTheme = () => {
  const themeValue = useContext(ThemeContext);

  return typeof themeValue === 'string'
    ? themes[themeValue]
    : {
        colors: {
          ...lightTheme.colors,
          ...themeValue.colors,
        },
      };
};

export const useThemedStyles = <T>(styles: (theme: Theme) => T) => {
  const theme = useTheme();

  return styles(theme);
};
