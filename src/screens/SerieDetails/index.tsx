import { useState, useEffect, useRef, FC } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { ArrowLeft, Star, ListPlus, FileX } from 'phosphor-react-native';

import { DetailsDTO } from '@dtos/Serie/DetalsDTO';

import { apiImageUrl } from '@services/api';
// import { getSeasonDetails } from '@services/series';

import { useDetailsRequest } from '@hooks/Serie/useDetailsRequest';

import { GenreCard, GenreCardWrapper, GenreCardTitle } from '@components/GenreCard';
import {
  SeasonCard,
  SeasonCardWrapper,
  SeasonCardTitle,
} from '@components-of-screens/SerieDetails/components/SeasonCard';
// import {
//   ActorCard,
//   ActorCardWrapper,
//   ActorCardTitle,
// } from '@components-of-screens/MovieDetails/components/ActorCard';
import { MovieCard, MovieCardWrapper, MovieCardTitle } from '@components/MovieCard';
import { Loading } from '@components/Loading';

import {
  Container,
  BackButton,
  PosterWrapper,
  Poster,
  EmptyPoster,
  Gradient,
  Header,
  Box,
  RatingCard,
  Rating,
  AddListButton,
  Content,
  Title,
  Overview,
} from './styles';

interface Params {
  id: number;
}

export const SerieDetails: FC = () => {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as Params;
  const { serieDetails, recommendedSeries } = useDetailsRequest(id);
  const { colors } = useTheme();

  const [isActiveSeason, setIsActiveSeason] = useState<number>(1);
  const [poster, setPoster] = useState<string>('');
  const [overview, setOverview] = useState<string | null>(null);

  const flatListRef = useRef<FlatList>(null);

  const rating = serieDetails.data.vote_average / 2;

  const onBackButtonPress = (): void => goBack();

  const onToggleSeason = (item: DetailsDTO.Season): void => {
    setIsActiveSeason(item.season_number);
    setPoster(item.poster_path);

    if (item.overview !== '') {
      setOverview(item.overview);
    } else {
      setOverview(null);
    }
  };

  const onNavigateToSerieDetails = (serieId: number): void => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    navigate('SerieDetails', { id: serieId });
  };

  useEffect(() => {
    setIsActiveSeason(serieDetails.data?.seasons[0].season_number);
    setPoster(serieDetails.data?.seasons[0].poster_path);

    if (serieDetails.data?.seasons[0].overview !== '') {
      setOverview(serieDetails.data?.seasons[0].overview);
    }

    // if (serieDetails.isSuccess) {
    //   const data = getSeasonDetails(
    //     id,
    //     serieDetails.data?.seasons[0].season_number
    //   );

    //   console.log(data);
    // }
  }, [serieDetails.data?.seasons, serieDetails.isSuccess]);

  return (
    <Container>
      {(serieDetails.isLoading || recommendedSeries.isLoading) && <Loading />}

      {serieDetails.isSuccess && recommendedSeries.isSuccess && (
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
                  {serieDetails.data?.seasons[0].poster_path ? (
                    <Poster
                      source={{
                        uri: `${apiImageUrl}${poster}`,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <EmptyPoster>
                      <FileX size={60} color={colors.text60} />
                    </EmptyPoster>
                  )}

                  <Gradient colors={colors.gradient}>
                    {/* <Current>{currentMovie}</Current> */}
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
                    data={serieDetails.data?.genres}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <GenreCard title={item.name} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </GenreCardWrapper>

                <Content>
                  <Title>{serieDetails.data?.name}</Title>
                  <Overview>{overview ?? 'Empty overview'}</Overview>
                </Content>

                <SeasonCardWrapper>
                  <SeasonCardTitle>Seasons</SeasonCardTitle>

                  <FlatList
                    style={{ marginTop: 12 }}
                    contentContainerStyle={{ gap: 16 }}
                    data={serieDetails.data?.seasons}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <SeasonCard
                        data={item}
                        isActive={isActiveSeason === item.season_number}
                        onPress={() => onToggleSeason(item)}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </SeasonCardWrapper>

                {/* {movieCredits.data?.cast.length > 0 && (
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
                )} */}

                {recommendedSeries.data?.results.length > 0 && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Recommended</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 12 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={recommendedSeries.data?.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard data={item} onPress={() => onNavigateToSerieDetails(item.id)} />
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
