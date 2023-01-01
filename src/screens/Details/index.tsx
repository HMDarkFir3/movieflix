import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useRef, useCallback, FC } from "react";
import { FlatList } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { useQuery } from "react-query";
import { useTheme } from "styled-components/native";
import { ArrowLeft, Star, ListPlus } from "phosphor-react-native";

import { getMovieDetails, getRecommendedMovies } from "@services/movies";
import { apiImageUrl } from "@services/api";

import {
  GenreCard,
  GenreCardWrapper,
  GenreCardTitle,
  GenreCardSeparator,
} from "@components-of-screens/Details/components/GenreCard";
import {
  RecommendedCard,
  RecommendedCardWrapper,
  RecommendedCardTitle,
  RecommendedCardSeparator,
} from "@components-of-screens/Details/components/RecommendedCard";
import { Loading } from "@components/Loading";

import { IS_IOS } from "@utils/variables";

import {
  Container,
  BackButton,
  PosterWrapper,
  Poster,
  Gradient,
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
  const {
    data: movieDetailsData,
    isLoading: movieDetailsIsLoading,
    isSuccess: movieDetailsIsSuccess,
  } = useQuery(["movieDetails", id], () => getMovieDetails(id));
  const {
    data: recommendedMoviesData,
    isLoading: recommendedMoviesIsLoading,
    isSuccess: recommendedMoviesIsSuccess,
  } = useQuery(["recommendedMovies", id], () => getRecommendedMovies(id));
  const { colors } = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const rating = movieDetailsData?.vote_average / 2;

  const onBackButtonPress = () => goBack();

  const onNavigateToMovieDetails = (id: number) => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    navigate("Details", { id });
  };

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
      {movieDetailsIsLoading && recommendedMoviesIsLoading && <Loading />}

      {movieDetailsIsSuccess && recommendedMoviesIsSuccess && (
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
                  <Poster
                    source={{
                      uri: `${apiImageUrl}${movieDetailsData?.poster_path}`,
                    }}
                    resizeMode="cover"
                  />

                  <Gradient colors={colors.screens.details.gradient} />
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
                    data={movieDetailsData?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    ItemSeparatorComponent={() => <GenreCardSeparator />}
                    horizontal
                  />
                </GenreCardWrapper>

                <Content>
                  <Title>{movieDetailsData?.title}</Title>
                  <Overview>{movieDetailsData?.overview}</Overview>
                </Content>

                {recommendedMoviesData?.results.length > 0 && (
                  <RecommendedCardWrapper>
                    <RecommendedCardTitle>Recommended:</RecommendedCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      data={recommendedMoviesData?.results}
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
                    />
                  </RecommendedCardWrapper>
                )}
              </>
            )}
          />
        </>
      )}
    </Container>
  );
};
