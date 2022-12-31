import { api } from "@services/api";

import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";

const getUpcomingMovies = async () => {
  const response = await api.get<UpcomingDTO.Response>("/movie/upcoming");
  return response.data;
};

export { getUpcomingMovies };
