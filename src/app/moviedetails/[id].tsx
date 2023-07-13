import { router, usePathname } from 'expo-router';
import { useRef, FC } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ArrowLeft, Star, ListPlus, FileX } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { useDetailsRequest } from '@hooks/Movie/useDetailsRequest';

import { GenreCard, GenreCardWrapper, GenreCardTitle } from '@components/GenreCard';
import { ActorCard, ActorCardWrapper, ActorCardTitle } from '@components/ActorCard';
import { MovieCard, MovieCardWrapper, MovieCardTitle } from '@components/MovieCard';
import { Loading } from '@components/Loading';

import { formatCurrentMovie } from '@utils/formatCurrentMovie';

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
} from './styles';

const MovieDetails: FC = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const { movieDetails, movieCredits, recommendedMovies } = useDetailsRequest(Number(id));
  const { colors } = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const rating = movieDetails.data?.vote_average / 2;

  const currentMovie = formatCurrentMovie(movieDetails.data?.runtime);

  const onBackButtonPress = (): void => router.back();

  const onNavigateToMovieDetails = (movieId: number): void => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    router.push(`moviedetails/${movieId}`);
  };

  return (
    <Container>
      {(movieDetails.isLoading || recommendedMovies.isLoading) && <Loading />}

      {movieDetails.isSuccess && recommendedMovies.isSuccess && (
        <>
          <BackButton onPress={onBackButtonPress}>
            <ArrowLeft size={24} color={colors.text10} weight="bold" />
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
                      <FileX size={60} color={colors.text60} />
                    </EmptyPoster>
                  )}

                  <Gradient colors={colors.gradient}>
                    <Current>{currentMovie}</Current>
                  </Gradient>
                </PosterWrapper>

                <Header>
                  <Box>
                    <RatingCard>
                      <Star size={16} color={colors.star} weight="fill" />
                      <Rating>{rating.toFixed(1)}</Rating>
                    </RatingCard>
                  </Box>

                  <Box>
                    <AddListButton>
                      <ListPlus size={24} color={colors.text10} />
                    </AddListButton>
                  </Box>
                </Header>

                <GenreCardWrapper>
                  <GenreCardTitle>Genre:</GenreCardTitle>

                  <FlatList
                    style={{ marginTop: 12 }}
                    contentContainerStyle={{ gap: 8 }}
                    data={movieDetails.data?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
                      contentContainerStyle={{ gap: 16 }}
                      data={movieCredits.data?.cast}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => <ActorCard data={item} />}
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
                      contentContainerStyle={{ gap: 16 }}
                      data={recommendedMovies.data?.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="moviedetails"
                          onPress={() => onNavigateToMovieDetails(item.id)}
                        />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </MovieCardWrapper>
                )}
              </>
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Container>
  );
};

export default MovieDetails;
