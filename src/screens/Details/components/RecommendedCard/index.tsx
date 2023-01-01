import { FC } from "react";
import { PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Star } from "phosphor-react-native";

import { apiImageUrl } from "@services/api";

import { RecommendationsDTO } from "@dtos/Movie/RecommendationsDTO";

import {
  Container,
  Poster,
  RatingCard,
  Rating,
  Title,
  RecommendedCardWrapper,
  RecommendedCardTitle,
  RecommendedCardSeparator,
} from "./styles";

interface Props extends PressableProps {
  data: RecommendationsDTO.Result;
}

export const RecommendedCard: FC<Props> = (props) => {
  const { poster_path, vote_average, title } = props.data;
  const { ...rest } = props;

  const { colors } = useTheme();

  const rating = vote_average / 2;

  return (
    <Container {...rest}>
      <Poster
        source={{ uri: `${apiImageUrl}${poster_path}` }}
        resizeMode="cover"
      />
      <RatingCard>
        <Star
          size={16}
          color={colors.screens.details.components.recommendedCard.icon}
          weight="fill"
        />
        <Rating>{rating.toFixed(1)}</Rating>
      </RatingCard>
      <Title>{title}</Title>
    </Container>
  );
};

export {
  RecommendedCardWrapper,
  RecommendedCardTitle,
  RecommendedCardSeparator,
};
