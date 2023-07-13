import { Link } from 'expo-router';
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
  pathname: 'seriedetails' | 'moviedetails';
}

export const UpcomingCard: FC<Props> = (props) => {
  const { id, backdrop_path: backdropPath, title, vote_average: voteAverage } = props.data;
  const { pathname, ...rest } = props;

  const rating = voteAverage / 2;

  return (
    <Link href={{ pathname: `/${pathname}/${id}` }}>
      <Container {...rest}>
        <Wrapper>
          <Poster source={{ uri: `${apiImageUrl}${backdropPath}` }} resizeMode="contain" />

          <RatingCard rating={rating} />
          <Title>{title}</Title>
        </Wrapper>
      </Container>
    </Link>
  );
};

export { UpcomingCardWrapper, UpcomingCardTitle };
