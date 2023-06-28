import { api } from "@services/api";

import { SeriesDTO } from "@dtos/Serie/SeriesDTO";
import { DetailsDTO } from "@dtos/Serie/DetalsDTO";

const getAiringTodaySeries = async () => {
  const response = await api.get<SeriesDTO.Response>("/tv/airing_today");
  return response.data;
};

const getOnTheAirSeries = async () => {
  const response = await api.get<SeriesDTO.Response>("/tv/on_the_air");
  return response.data;
};

const getPopularSeries = async () => {
  const response = await api.get<SeriesDTO.Response>("/tv/popular");
  return response.data;
};

const getTopRatedSeries = async () => {
  const response = await api.get<SeriesDTO.Response>("/tv/top_rated");
  return response.data;
};

const getSerieDetails = async (id: number) => {
  const response = await api.get<DetailsDTO.Response>(`/tv/${id}`);
  return response.data;
};

const getRecommendedSeries = async (id: number) => {
  const response = await api.get<SeriesDTO.Response>(
    `/tv/${id}/recommendations`
  );
  return response.data;
};

export {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
  getSerieDetails,
  getRecommendedSeries,
};
