import React, {useState, useMemo, useEffect} from 'react';
import {StatusBar, YellowBox} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';
import {Provider} from 'react-redux';
import store1 from './store';
import {locationPermission} from './src/screens/Configuracion/helperGeocalizacion';

YellowBox.ignoreWarnings(['Calling `getNode()`']);

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(async () => {
    await locationPermission();
  }, []);

  DefaultThemePaper.colors.primary = '#8C97A1';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return (
    <Provider store={store1}>
      <PreferencesContext.Provider value={preference}>
        <PaperProvider
          theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer
            theme={
              theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
            }>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </Provider>
  );
}
