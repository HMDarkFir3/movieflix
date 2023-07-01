import { FC } from 'react';
import { PressableProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Star } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { MoviesDTO } from '@dtos/Movie/MoviesDTO';

import {
  Container,
  Wrapper,
  Poster,
  RatingCard,
  Rating,
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

  const { colors } = useTheme();

  const rating = voteAverage / 2;

  return (
    <Container {...rest}>
      <Wrapper>
        <Poster source={{ uri: `${apiImageUrl}${backdropPath}` }} resizeMode="contain" />

        <RatingCard>
          <Star size={16} color={colors.star} weight="fill" />
          <Rating>{rating.toFixed(1)}</Rating>
        </RatingCard>
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export { UpcomingCardWrapper, UpcomingCardTitle };
