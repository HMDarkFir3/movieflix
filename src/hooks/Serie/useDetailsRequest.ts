import { useQueries } from 'react-query';

import { getSerieDetails, getRecommendedSeries } from '@/services/series';

const useDetailsRequest = (id: number) => {
  const [serieDetails, recommendedSeries] = useQueries([
    {
      queryKey: ['serieDetails', id],
      queryFn: () => getSerieDetails(id),
      onSuccess: async () => {},
    },
    {
      queryKey: ['recommendedSeries', id],
      queryFn: () => getRecommendedSeries(id),
    },
  ]);

  return { serieDetails, recommendedSeries };
};

export { useDetailsRequest };
