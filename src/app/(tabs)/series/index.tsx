import { router } from 'expo-router';
import { FC } from 'react';
import { FlatList } from 'react-native';

import { useSeriesRequest } from '@/hooks/Serie/useSeriesRequest';

import { MovieCard, MovieCardWrapper, MovieCardTitle } from '@/components/MovieCard';
import { Loading } from '@/components/Loading';

import { Container, Wrapper } from './styles';

const Series: FC = () => {
  const { airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries } = useSeriesRequest();

  const onNavigateToDetails = (url: 'serie-details' | 'movie-details', id: number) =>
    router.push(`${url}/${String(id)}`);

  return (
    <Container>
      <Wrapper>
        {airingTodaySeries.isLoading ||
        onTheAirSeries.isLoading ||
        popularSeries.isLoading ||
        topRatedSeries.isLoading ? (
          <Loading />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={[0]}
            keyExtractor={(item) => String(item)}
            renderItem={() => (
              <>
                {airingTodaySeries.isSuccess && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Airing Today</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={airingTodaySeries.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="serie-details"
                          onPress={() => onNavigateToDetails('serie-details', item.id)}
                        />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </MovieCardWrapper>
                )}

                {onTheAirSeries.isSuccess && (
                  <MovieCardWrapper>
                    <MovieCardTitle>On The Air</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={onTheAirSeries.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="serie-details"
                          onPress={() => onNavigateToDetails('serie-details', item.id)}
                        />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </MovieCardWrapper>
                )}

                {popularSeries.isSuccess && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Popular</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={popularSeries.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="serie-details"
                          onPress={() => onNavigateToDetails('serie-details', item.id)}
                        />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </MovieCardWrapper>
                )}

                {topRatedSeries.isSuccess && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Top Rated</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={topRatedSeries.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="serie-details"
                          onPress={() => onNavigateToDetails('serie-details', item.id)}
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
        )}
      </Wrapper>
    </Container>
  );
};

export default Series;
