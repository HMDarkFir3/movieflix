import { api } from '@/services/api';

import { MoviesDTO } from '@/dtos/Movie/MoviesDTO';
import { DetailsDTO } from '@/dtos/Movie/DetailsDTO';
import { CreditsDTO } from '@/dtos/Movie/CreditsDTO';

const getUpcomingMovies = async () => {
  const response = await api.get<MoviesDTO.Response>('/movie/upcoming');
  return response.data;
};

const getPopularMovies = async () => {
  const response = await api.get<MoviesDTO.Response>('/movie/popular');
  return response.data;
};

const getTopRatedMovies = async () => {
  const response = await api.get<MoviesDTO.Response>('/movie/top_rated');
  return response.data;
};

const getMovieDetails = async (movieId: number) => {
  const response = await api.get<DetailsDTO.Response>(`/movie/${movieId}`);
  return response.data;
};

const getMovieCredits = async (movieId: number) => {
  const response = await api.get<CreditsDTO.Response>(`/movie/${movieId}/credits`);
  return response.data;
};

const getRecommendedMovies = async (movieId: number) => {
  const response = await api.get<MoviesDTO.Response>(`/movie/${movieId}/recommendations`);
  return response.data;
};

export {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieDetails,
  getMovieCredits,
  getRecommendedMovies,
};
