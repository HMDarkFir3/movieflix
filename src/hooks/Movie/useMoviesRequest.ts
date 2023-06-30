import { useQueries } from 'react-query';

import { getUpcomingMovies, getPopularMovies, getTopRatedMovies } from '@services/movies';

const useMoviesRequest = (enabled: boolean) => {
  const [upcomingMovies, popularMovies, topRatedMovies] = useQueries([
    {
      queryKey: 'upcomingMovies',
      queryFn: () => getUpcomingMovies(),
      enabled,
    },
    {
      queryKey: 'popularMovies',
      queryFn: () => getPopularMovies(),
      enabled,
    },
    {
      queryKey: 'topRatedMovies',
      queryFn: () => getTopRatedMovies(),
      enabled,
    },
  ]);

  return { upcomingMovies, popularMovies, topRatedMovies };
};

export { useMoviesRequest };
