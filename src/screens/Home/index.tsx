import * as NavigationBar from "expo-navigation-bar";
import { useCallback, FC } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { useStreaming } from "@hooks/useStreaming";

import { CategoryItem } from "@components-of-screens/Home/components/CategoryItem";

import { IS_IOS, STATUS_BAR_HEIGHT } from "@utils/variables";

import { Container } from "./styles";

const categories = [
  {
    id: 1,
    title: "series",
    slug: "tv",
  },
  {
    id: 2,
    title: "film",
    slug: "movie",
  },
  {
    id: 3,
    title: "my list",
    slug: "my-list",
  },
];

export const Home: FC = () => {
  const { state: streamingState, dispatch: streamingDispatch } = useStreaming();
  const { colors } = useTheme();

  const onSelectedCategory = (slug: "tv" | "movie" | "my-list") =>
    streamingDispatch({ type: "SET_CATEGORY_STREAMING", payload: slug });

  useFocusEffect(
    useCallback(() => {
      if (!IS_IOS) {
        NavigationBar.setBackgroundColorAsync(colors.navigationBar.background);
        NavigationBar.setButtonStyleAsync("light");
      }
    }, [])
  );

  return (
    <Container>
      <FlatList
        style={{ marginTop: STATUS_BAR_HEIGHT + 20 }}
        contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem
            title={item.title}
            isActive={streamingState.category === item.slug}
            onPress={() =>
              onSelectedCategory(item.slug as "tv" | "movie" | "my-list")
            }
          />
        )}
        horizontal
      />
    </Container>
  );
};
