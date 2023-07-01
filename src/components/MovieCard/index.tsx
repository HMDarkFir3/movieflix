import { FC } from 'react';
import { PressableProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FileX } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { SeriesDTO } from '@dtos/Serie/SeriesDTO';
import { MoviesDTO } from '@dtos/Movie/MoviesDTO';

import { RatingCard } from '@components/RatingCard';

import { Container, Poster, EmptyPoster, MovieCardWrapper, MovieCardTitle } from './styles';

interface Props extends PressableProps {
  data: MoviesDTO.Result | SeriesDTO.Result;
}

export const MovieCard: FC<Props> = (props) => {
  const { poster_path: posterPath, vote_average: voteAverage } = props.data;
  const { ...rest } = props;

  const { colors } = useTheme();

  const rating = voteAverage / 2;

  return (
    <Container {...rest}>
      {posterPath ? (
        <Poster source={{ uri: `${apiImageUrl}${posterPath}` }} />
      ) : (
        <EmptyPoster>
          <FileX size={40} color={colors.text60} />
        </EmptyPoster>
      )}

      <RatingCard rating={rating} />
    </Container>
  );
};

export { MovieCardWrapper, MovieCardTitle };
