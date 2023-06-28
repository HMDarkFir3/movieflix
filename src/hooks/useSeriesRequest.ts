import { useQueries } from "react-query";

import {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
} from "@services/series";

const useSeriesRequest = (enabled: boolean) => {
  const [airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries] =
    useQueries([
      {
        queryKey: "airingTodaySeries",
        queryFn: () => getAiringTodaySeries(),
        enabled,
      },
      {
        queryKey: "onTheAirSeries",
        queryFn: () => getOnTheAirSeries(),
        enabled,
      },
      {
        queryKey: "popularSeries",
        queryFn: () => getPopularSeries(),
        enabled,
      },
      {
        queryKey: "topRatedSeries",
        queryFn: () => getTopRatedSeries(),
        enabled,
      },
    ]);

  return { airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries };
};

export { useSeriesRequest };
