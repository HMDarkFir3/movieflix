import * as NavigationBar from "expo-navigation-bar";
import { useCallback, FC } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { IS_IOS } from "@utils/variables";

import { Container } from "./styles";

export const Home: FC = () => {
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      if (!IS_IOS) {
        NavigationBar.setBackgroundColorAsync(colors.navigationBar.background);
        NavigationBar.setButtonStyleAsync("light");
      }
    }, [])
  );

  return <Container />;
};
