import { useQueries } from 'react-query';

import {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
} from '@/services/series';

const useSeriesRequest = () => {
  const [airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries] = useQueries([
    {
      queryKey: 'airingTodaySeries',
      queryFn: () => getAiringTodaySeries(),
    },
    {
      queryKey: 'onTheAirSeries',
      queryFn: () => getOnTheAirSeries(),
    },
    {
      queryKey: 'popularSeries',
      queryFn: () => getPopularSeries(),
    },
    {
      queryKey: 'topRatedSeries',
      queryFn: () => getTopRatedSeries(),
    },
  ]);

  return { airingTodaySeries, onTheAirSeries, popularSeries, topRatedSeries };
};

export { useSeriesRequest };
