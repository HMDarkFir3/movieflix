import { FC } from "react";
import { PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Star, FileX } from "phosphor-react-native";

import { apiImageUrl } from "@services/api";

import { RecommendationsDTO } from "@dtos/Movie/RecommendationsDTO";

import {
  Container,
  Poster,
  EmptyPoster,
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
      {poster_path ? (
        <Poster
          source={{ uri: `${apiImageUrl}${poster_path}` }}
          resizeMode="cover"
        />
      ) : (
        <EmptyPoster>
          <FileX
            size={28}
            color={
              colors.screens.details.components.recommendedCard.iconPrimary
            }
            weight="thin"
          />
        </EmptyPoster>
      )}

      <RatingCard>
        <Star
          size={16}
          color={
            colors.screens.details.components.recommendedCard.iconSecondary
          }
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
