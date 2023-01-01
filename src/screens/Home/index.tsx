import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useCallback, FC } from "react";
import { FlatList } from "react-native";
import { useQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { getUpcomingMovies } from "@services/movies";

import { useStreaming } from "@hooks/useStreaming";

import {
  CategoryItem,
  CategoryItemWrapper,
} from "@components-of-screens/Home/components/CategoryItem";
import {
  UpcomingCard,
  UpcomingCardWrapper,
  UpcomingCardTitle,
} from "@components-of-screens/Home/components/UpcomingCard";
import { Loading } from "@components/Loading";

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

  const {
    data: upcomingMoviesData,
    isLoading: upcomingMoviesIsLoading,
    isSuccess: upcomingMoviesIsSuccess,
  } = useQuery("upcomingMovies", getUpcomingMovies, {
    enabled: streamingState.category === "movie",
  });

  const onSelectedCategory = (slug: "tv" | "movie" | "my-list") =>
    streamingDispatch({ type: "SET_CATEGORY", payload: slug });

  useFocusEffect(
    useCallback(() => {
      StatusBar.setStatusBarTranslucent(true);

      if (!IS_IOS) {
        NavigationBar.setBackgroundColorAsync(colors.navigationBar.background);
        NavigationBar.setButtonStyleAsync("light");
      }
    }, [])
  );

  return (
    <Container>
      <CategoryItemWrapper>
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
      </CategoryItemWrapper>

      {upcomingMoviesIsLoading && <Loading />}

      {upcomingMoviesIsSuccess && (
        <UpcomingCardWrapper>
          <UpcomingCardTitle>Coming Soon</UpcomingCardTitle>
          <FlatList
            style={{ marginTop: 24 }}
            data={upcomingMoviesData?.results}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <UpcomingCard data={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
          />
        </UpcomingCardWrapper>
      )}
    </Container>
  );
};
