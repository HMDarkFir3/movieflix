import { FC } from 'react';
import { PressableProps } from 'react-native';

import { apiImageUrl } from '@services/api';

import { MoviesDTO } from '@dtos/Movie/MoviesDTO';

import { RatingCard } from '@components/RatingCard';

import {
  Container,
  Wrapper,
  Poster,
  Title,
  UpcomingCardWrapper,
  UpcomingCardTitle,
} from './styles';

interface Props extends PressableProps {
  data: MoviesDTO.Result;
}

export const UpcomingCard: FC<Props> = (props) => {
  const { backdrop_path: backdropPath, title, vote_average: voteAverage } = props.data;
  const { ...rest } = props;

  const rating = voteAverage / 2;

  return (
    <Container {...rest}>
      <Wrapper>
        <Poster source={{ uri: `${apiImageUrl}${backdropPath}` }} resizeMode="contain" />

        <RatingCard rating={rating} />
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export { UpcomingCardWrapper, UpcomingCardTitle };
