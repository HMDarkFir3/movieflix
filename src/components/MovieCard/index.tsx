import { FC } from 'react';
import { PressableProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FileX, Star } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { SeriesDTO } from '@dtos/Serie/SeriesDTO';
import { MoviesDTO } from '@dtos/Movie/MoviesDTO';

import {
  Container,
  Poster,
  EmptyPoster,
  RatingCard,
  Rating,
  MovieCardWrapper,
  MovieCardTitle,
} from './styles';

interface Props extends PressableProps {
  data: MoviesDTO.Result | SeriesDTO.Result;
}

export const MovieCard: FC<Props> = (props) => {
  const { poster_path, vote_average } = props.data;
  const { ...rest } = props;

  const { colors } = useTheme();

  const rating = vote_average / 2;

  return (
    <Container {...rest}>
      {poster_path ? (
        <Poster source={{ uri: `${apiImageUrl}${poster_path}` }} />
      ) : (
        <EmptyPoster>
          <FileX size={40} color={colors.text60} />
        </EmptyPoster>
      )}

      <RatingCard>
        <Star size={16} color={colors.star} weight="fill" />
        <Rating>{rating.toFixed(1)}</Rating>
      </RatingCard>
    </Container>
  );
};

export { MovieCardWrapper, MovieCardTitle };
