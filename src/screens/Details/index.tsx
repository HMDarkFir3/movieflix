import { FC } from "react";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { useTheme } from "styled-components/native";
import { ArrowLeft, Star, ListPlus } from "phosphor-react-native";

import { getMovieDetails } from "@services/movies";
import { apiImageUrl } from "@services/api";

import {
  GenreCard,
  GenreCardSeparator,
} from "@components-of-screens/Details/components/GenreCard";
import { Loading } from "@components/Loading";

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
  GenresWrapper,
  Genres,
  Content,
  Title,
  Overview,
} from "./styles";

interface Params {
  id: number;
}

export const Details: FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as Params;
  const {
    data: movieDetailsData,
    isLoading: movieDetailsIsLoading,
    isSuccess: movieDetailsIsSuccess,
  } = useQuery(["movieDetails", id], () => getMovieDetails(id));
  const { colors } = useTheme();

  const rating = movieDetailsData?.vote_average / 2;

  const onBackButtonPress = () => goBack();

  return (
    <Container>
      {movieDetailsIsLoading && <Loading />}

      {movieDetailsIsSuccess && (
        <>
          <BackButton onPress={onBackButtonPress}>
            <ArrowLeft
              size={24}
              color={colors.screens.details.icon}
              weight="bold"
            />
          </BackButton>

          <FlatList
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
                        color={colors.screens.details.star}
                        weight="fill"
                      />
                      <Rating>{rating.toFixed(1)}</Rating>
                    </RatingCard>
                  </Box>

                  <Box>
                    <AddListButton>
                      <ListPlus size={24} color={colors.screens.details.icon} />
                    </AddListButton>
                  </Box>
                </Header>

                <GenresWrapper>
                  <Genres>Genres:</Genres>

                  <FlatList
                    style={{ marginTop: 12 }}
                    data={movieDetailsData?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    ItemSeparatorComponent={() => <GenreCardSeparator />}
                    horizontal
                  />
                </GenresWrapper>

                <Content>
                  <Title>{movieDetailsData?.title}</Title>
                  <Overview>{movieDetailsData?.overview}</Overview>
                </Content>
              </>
            )}
          />
        </>
      )}
    </Container>
  );
};
