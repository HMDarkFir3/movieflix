import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@utils/constants';

const getScreenSizeForMovieDetails = () =>
  SCREEN_WIDTH * 2 >= SCREEN_HEIGHT ? SCREEN_HEIGHT / 1.25 : SCREEN_HEIGHT / 1.5;

export { getScreenSizeForMovieDetails };
