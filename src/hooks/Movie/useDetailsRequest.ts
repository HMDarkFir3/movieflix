import { useQueries } from 'react-query';

import { getMovieDetails, getMovieCredits, getRecommendedMovies } from '@/services/movies';

const useDetailsRequest = (id: number) => {
  const [movieDetails, movieCredits, recommendedMovies] = useQueries([
    { queryKey: ['movieDetails', id], queryFn: () => getMovieDetails(id) },
    { queryKey: ['movieCredits', id], queryFn: () => getMovieCredits(id) },
    {
      queryKey: ['recommendedMovies', id],
      queryFn: () => getRecommendedMovies(id),
    },
  ]);

  return { movieDetails, movieCredits, recommendedMovies };
};

export { useDetailsRequest };
