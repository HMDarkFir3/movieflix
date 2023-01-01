import { api } from "@services/api";

import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";
import { DetailsDTO } from "@dtos/Movie/DetailsDTO";

const getUpcomingMovies = async () => {
  const response = await api.get<UpcomingDTO.Response>("/movie/upcoming");
  return response.data;
};

const getMovieDetails = async (movieId: number) => {
  const response = await api.get<DetailsDTO.Response>(`/movie/${movieId}`);
  return response.data;
};

export { getUpcomingMovies, getMovieDetails };
