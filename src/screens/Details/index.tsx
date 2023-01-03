import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useRef, useCallback, FC } from "react";
import { FlatList } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { useQueries } from "react-query";
import { useTheme } from "styled-components/native";
import { ArrowLeft, Star, ListPlus, FileX } from "phosphor-react-native";

import {
  getMovieDetails,
  getMovieCredits,
  getRecommendedMovies,
} from "@services/movies";
import { apiImageUrl } from "@services/api";

import {
  GenreCard,
  GenreCardWrapper,
  GenreCardTitle,
  GenreCardSeparator,
} from "@components-of-screens/Details/components/GenreCard";
import {
  ActorCard,
  ActorCardWrapper,
  ActorCardTitle,
  ActorCardSeparator,
} from "@components-of-screens/Details/components/ActorCard";
import {
  MovieCard,
  MovieCardWrapper,
  MovieCardTitle,
  MovieCardSeparator,
} from "@components/MovieCard";
import { Loading } from "@components/Loading";

import { IS_IOS } from "@utils/variables";
import { formatCurrentMovie } from "@utils/formatCurrentMovie";

import {
  Container,
  BackButton,
  PosterWrapper,
  Poster,
  EmptyPoster,
  Gradient,
  Current,
  Header,
  Box,
  RatingCard,
  Rating,
  AddListButton,
  Content,
  Title,
  Overview,
} from "./styles";

interface Params {
  id: number;
}

export const Details: FC = () => {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as Params;
  const [movieDetails, movieCredits, recommendedMovies] = useQueries([
    { queryKey: ["movieDetails", id], queryFn: () => getMovieDetails(id) },
    { queryKey: ["movieCredits", id], queryFn: () => getMovieCredits(id) },
    {
      queryKey: ["recommendedMovies", id],
      queryFn: () => getRecommendedMovies(id),
    },
  ]);
  const { colors } = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const rating = movieDetails.data?.vote_average / 2;
  const currentMovie = formatCurrentMovie(movieDetails.data?.runtime);

  const onBackButtonPress = (): void => goBack();

  const onNavigateToMovieDetails = (id: number): void => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    navigate("Details", { id });
  };

  useFocusEffect(
    useCallback((): void => {
      if (!IS_IOS) {
        StatusBar.setStatusBarTranslucent(true);
        NavigationBar.setBackgroundColorAsync(colors.navigationBar.background);
        NavigationBar.setButtonStyleAsync("light");
      }
    }, [])
  );

  return (
    <Container>
      {movieDetails.isLoading && recommendedMovies.isLoading && <Loading />}

      {movieDetails.isSuccess && recommendedMovies.isSuccess && (
        <>
          <BackButton onPress={onBackButtonPress}>
            <ArrowLeft
              size={24}
              color={colors.screens.details.iconPrimary}
              weight="bold"
            />
          </BackButton>

          <FlatList
            ref={flatListRef}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={[0]}
            keyExtractor={(item) => String(item)}
            renderItem={() => (
              <>
                <PosterWrapper>
                  {movieDetails.data?.poster_path ? (
                    <Poster
                      source={{
                        uri: `${apiImageUrl}${movieDetails.data?.poster_path}`,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <EmptyPoster>
                      <FileX
                        size={60}
                        color={colors.screens.details.iconTertiary}
                      />
                    </EmptyPoster>
                  )}

                  <Gradient colors={colors.screens.details.gradient}>
                    <Current>{currentMovie}</Current>
                  </Gradient>
                </PosterWrapper>

                <Header>
                  <Box>
                    <RatingCard>
                      <Star
                        size={16}
                        color={colors.screens.details.iconSecondary}
                        weight="fill"
                      />
                      <Rating>{rating.toFixed(1)}</Rating>
                    </RatingCard>
                  </Box>

                  <Box>
                    <AddListButton>
                      <ListPlus
                        size={24}
                        color={colors.screens.details.iconPrimary}
                      />
                    </AddListButton>
                  </Box>
                </Header>

                <GenreCardWrapper>
                  <GenreCardTitle>Genre:</GenreCardTitle>

                  <FlatList
                    style={{ marginTop: 12 }}
                    data={movieDetails.data?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    ItemSeparatorComponent={() => <GenreCardSeparator />}
                    horizontal
                  />
                </GenreCardWrapper>

                <Content>
                  <Title>{movieDetails.data?.title}</Title>
                  <Overview>{movieDetails.data?.overview}</Overview>
                </Content>

                {movieCredits.data?.cast.length > 0 && (
                  <ActorCardWrapper>
                    <ActorCardTitle>Actors:</ActorCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      data={movieCredits.data?.cast}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => <ActorCard data={item} />}
                      ItemSeparatorComponent={() => <ActorCardSeparator />}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </ActorCardWrapper>
                )}

                {recommendedMovies.data?.results.length > 0 && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Recommended:</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      data={recommendedMovies.data?.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          onPress={() => onNavigateToMovieDetails(item.id)}
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
            bounces={false}
          />
        </>
      )}
    </Container>
  );
};
