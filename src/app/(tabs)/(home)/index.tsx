import { router } from 'expo-router';
import { FC } from 'react';
import { FlatList } from 'react-native';

import { useMoviesRequest } from '@/hooks/Movie/useMoviesRequest';

import { UpcomingCard, UpcomingCardWrapper, UpcomingCardTitle } from '@/components/UpcomingCard';
import { MovieCard, MovieCardWrapper, MovieCardTitle } from '@/components/MovieCard';
import { Loading } from '@/components/Loading';

import { Container, Wrapper } from './styles';

const Home: FC = () => {
  const { upcomingMovies, popularMovies, topRatedMovies } = useMoviesRequest();

  const onNavigateToDetails = (url: 'serie-details' | 'movie-details', id: number) =>
    router.push(`${url}/${String(id)}`);

  return (
    <Container>
      <Wrapper>
        {upcomingMovies.isLoading || popularMovies.isLoading || topRatedMovies.isLoading ? (
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
                    <UpcomingCardTitle>Coming Soon</UpcomingCardTitle>
                    <FlatList
                      style={{ marginTop: 16 }}
                      data={upcomingMovies.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <UpcomingCard
                          data={item}
                          pathname="movie-details"
                          onPress={() => onNavigateToDetails('movie-details', item.id)}
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
                    <MovieCardTitle>Popular</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={popularMovies.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="movie-details"
                          onPress={() => onNavigateToDetails('movie-details', item.id)}
                        />
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </MovieCardWrapper>
                )}

                {topRatedMovies.isSuccess && (
                  <MovieCardWrapper>
                    <MovieCardTitle>Top Rated</MovieCardTitle>

                    <FlatList
                      style={{ marginTop: 16 }}
                      contentContainerStyle={{ gap: 16 }}
                      data={topRatedMovies.data.results}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={({ item }) => (
                        <MovieCard
                          data={item}
                          pathname="movie-details"
                          onPress={() => onNavigateToDetails('movie-details', item.id)}
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

export default Home;
