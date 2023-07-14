import { useQueries } from 'react-query';

import { getUpcomingMovies, getPopularMovies, getTopRatedMovies } from '@/services/movies';

const useMoviesRequest = () => {
  const [upcomingMovies, popularMovies, topRatedMovies] = useQueries([
    {
      queryKey: 'upcomingMovies',
      queryFn: () => getUpcomingMovies(),
    },
    {
      queryKey: 'popularMovies',
      queryFn: () => getPopularMovies(),
    },
    {
      queryKey: 'topRatedMovies',
      queryFn: () => getTopRatedMovies(),
    },
  ]);

  return { upcomingMovies, popularMovies, topRatedMovies };
};

export { useMoviesRequest };
