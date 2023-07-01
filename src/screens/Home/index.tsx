import { useState, FC } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSeriesRequest } from '@hooks/Serie/useSeriesRequest';
import { useMoviesRequest } from '@hooks/Movie/useMoviesRequest';

import {
  CategoryItem,
  CategoryItemWrapper,
} from '@components-of-screens/Home/components/CategoryItem';
import {
  UpcomingCard,
  UpcomingCardWrapper,
  UpcomingCardTitle,
} from '@components-of-screens/Home/components/UpcomingCard';
import { MovieCard, MovieCardWrapper, MovieCardTitle } from '@components/MovieCard';
import { Loading } from '@components/Loading';

import { categories } from '@utils/categories';
import { STATUS_BAR_HEIGHT } from '@utils/constants';

import { Container, Wrapper } from './styles';

export const Home: FC = () => {
  const [category, setCategory] = useState<'series' | 'movies' | 'my-list'>('movies');

  const { airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries } = useSeriesRequest(
    category === 'series'
  );
  const { upcomingMovies, popularMovies, topRatedMovies } = useMoviesRequest(category === 'movies');

  const { navigate } = useNavigation();

  const onSelectedCategory = (slug: 'series' | 'movies' | 'my-list') => setCategory(slug);

  const onNavigateToDetails = (name: 'SerieDetails' | 'MovieDetails', id: number) =>
    navigate(name, { id });

  return (
    <Container>
      <CategoryItemWrapper>
        <FlatList
          style={{ marginTop: STATUS_BAR_HEIGHT + 20, marginBottom: 20 }}
          contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly' }}
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CategoryItem
              title={item.title}
              isActive={category === item.slug}
              onPress={() => onSelectedCategory(item.slug as 'series' | 'movies' | 'my-list')}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </CategoryItemWrapper>

      {category === 'series' && (
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
                            onPress={() => onNavigateToDetails('SerieDetails', item.id)}
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
                            onPress={() => onNavigateToDetails('SerieDetails', item.id)}
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
                            onPress={() => onNavigateToDetails('SerieDetails', item.id)}
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
                            onPress={() => onNavigateToDetails('SerieDetails', item.id)}
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
      )}

      {category === 'movies' && (
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
                            onPress={() => onNavigateToDetails('MovieDetails', item.id)}
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
                            onPress={() => onNavigateToDetails('MovieDetails', item.id)}
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
                            onPress={() => onNavigateToDetails('MovieDetails', item.id)}
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
      )}
    </Container>
  );
};
