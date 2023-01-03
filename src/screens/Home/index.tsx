import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useCallback, FC } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useQueries } from "react-query";
import { useTheme } from "styled-components/native";

import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@services/movies";

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
import {
  MovieCard,
  MovieCardWrapper,
  MovieCardTitle,
  MovieCardSeparator,
} from "@components/MovieCard";
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
  const { navigate } = useNavigation();
  const [upcomingMovies, popularMovies, topRatedMovies] = useQueries([
    {
      queryKey: "upcomingMovies",
      queryFn: () => getUpcomingMovies(),
      enabled: streamingState.category === "movie",
    },
    {
      queryKey: "popularMovies",
      queryFn: () => getPopularMovies(),
      enabled: streamingState.category === "movie",
    },
    {
      queryKey: "topRatedMovies",
      queryFn: () => getTopRatedMovies(),
      enabled: streamingState.category === "movie",
    },
  ]);

  const { colors } = useTheme();

  const onSelectedCategory = (slug: "tv" | "movie" | "my-list") =>
    streamingDispatch({ type: "SET_CATEGORY", payload: slug });

  const onNavigateToDetails = (id: number) => navigate("Details", { id });

  useFocusEffect(
    useCallback(() => {
      if (!IS_IOS) {
        StatusBar.setStatusBarTranslucent(true);
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
          showsHorizontalScrollIndicator={false}
        />
      </CategoryItemWrapper>

      {upcomingMovies.isLoading &&
      popularMovies.isLoading &&
      topRatedMovies.isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={[0]}
          keyExtractor={(item) => String(item)}
          renderItem={() => (
            <>
              {upcomingMovies.isSuccess && (
                <UpcomingCardWrapper>
                  <UpcomingCardTitle>Coming Soon:</UpcomingCardTitle>
                  <FlatList
                    style={{ marginTop: 16 }}
                    data={upcomingMovies.data?.results}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <UpcomingCard
                        data={item}
                        onPress={() => onNavigateToDetails(item.id)}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                  />
                </UpcomingCardWrapper>
              )}

              {popularMovies.isSuccess && (
                <MovieCardWrapper>
                  <MovieCardTitle>Popular:</MovieCardTitle>

                  <FlatList
                    style={{ marginTop: 16 }}
                    data={popularMovies.data?.results}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <MovieCard
                        data={item}
                        onPress={() => onNavigateToDetails(item.id)}
                      />
                    )}
                    ItemSeparatorComponent={() => <MovieCardSeparator />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </MovieCardWrapper>
              )}

              {topRatedMovies.isSuccess && (
                <MovieCardWrapper>
                  <MovieCardTitle>Top Rated:</MovieCardTitle>

                  <FlatList
                    style={{ marginTop: 16 }}
                    data={topRatedMovies.data?.results}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <MovieCard
                        data={item}
                        onPress={() => onNavigateToDetails(item.id)}
                      />
                    )}
                    ItemSeparatorComponent={() => <MovieCardSeparator />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </MovieCardWrapper>
              )}
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};
