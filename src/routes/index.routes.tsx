import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useCallback, FC } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { AppRoutes } from '@routes/app.routes';

import { IS_IOS } from '@utils/constants';

export const Routes: FC = () => {
  const { colors } = useTheme();

  useFocusEffect(
    useCallback((): void => {
      if (!IS_IOS) {
        NavigationBar.setBackgroundColorAsync(colors.background);
        NavigationBar.setButtonStyleAsync('light');
      }
    }, [])
  );

  return (
    <>
      <StatusBar />
      <AppRoutes />
    </>
  );
};
