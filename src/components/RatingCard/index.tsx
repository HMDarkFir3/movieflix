import { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { Star } from 'phosphor-react-native';

import { Container, Rating } from './styles';

interface Props {
  rating: number;
}

export const RatingCard: FC<Props> = (props) => {
  const { rating } = props;

  const { colors } = useTheme();

  return (
    <Container>
      <Star size={16} color={colors.star} weight="fill" />
      <Rating>{rating.toFixed(1)}</Rating>
    </Container>
  );
};
