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
  RecommendedCard,
  RecommendedCardWrapper,
  RecommendedCardTitle,
  RecommendedCardSeparator,
} from "@components-of-screens/Details/components/RecommendedCard";
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
  const [movieDetailsData, movieCreditsData, recommendedMoviesData] =
    useQueries([
      { queryKey: ["movieDetails", id], queryFn: () => getMovieDetails(id) },
      { queryKey: ["movieCredits", id], queryFn: () => getMovieCredits(id) },
      {
        queryKey: ["recommendedMovies", id],
        queryFn: () => getRecommendedMovies(id),
      },
    ]);
  const { colors } = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const rating = movieDetailsData.data?.vote_average / 2;
  const currentMovie = formatCurrentMovie(movieDetailsData.data?.runtime);

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
      {movieDetailsData.isLoading && recommendedMoviesData.isLoading && (
        <Loading />
      )}

      {movieDetailsData.isSuccess && recommendedMoviesData.isSuccess && (
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
                  {movieDetailsData.data?.poster_path ? (
                    <Poster
                      source={{
                        uri: `${apiImageUrl}${movieDetailsData.data?.poster_path}`,
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
                    data={movieDetailsData.data?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    ItemSeparatorComponent={() => <GenreCardSeparator />}
                    horizontal
                  />
                </GenreCardWrapper>

                <Content>
                  <Title>{movieDetailsData.data?.title}</Title>
                  <Overview>{movieDetailsData.data?.overview}</Overview>
                </Content>

                {movieCreditsData.data?.cast.length > 0 && (
                  <ActorCardWrapper>
                    <ActorCardTitle>Actors:</ActorCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      data={movieCreditsData.data?.cast}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => <ActorCard data={item} />}
                      ItemSeparatorComponent={() => <ActorCardSeparator />}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </ActorCardWrapper>
                )}

                {recommendedMoviesData.data?.results.length > 0 && (
                  <RecommendedCardWrapper>
                    <RecommendedCardTitle>Recommended:</RecommendedCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      data={recommendedMoviesData.data?.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <RecommendedCard
                          data={item}
                          onPress={() => onNavigateToMovieDetails(item.id)}
                        />
                      )}
                      ItemSeparatorComponent={() => (
                        <RecommendedCardSeparator />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </RecommendedCardWrapper>
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
