import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { FC } from "react";

import { Routes } from "@routes/index";

export const App: FC = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;
  SplashScreen.hideAsync();

  return <Routes />;
};
