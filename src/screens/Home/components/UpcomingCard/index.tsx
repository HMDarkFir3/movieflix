import { FC } from "react";
import { PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Star } from "phosphor-react-native";

import { apiImageUrl } from "@services/api";

import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";

import {
  Container,
  Wrapper,
  Poster,
  RatingCard,
  Rating,
  Title,
  UpcomingCardWrapper,
  UpcomingCardTitle,
} from "./styles";

interface Props extends PressableProps {
  data: UpcomingDTO.Result;
}

export const UpcomingCard: FC<Props> = (props) => {
  const { backdrop_path, title, vote_average } = props.data;
  const { ...rest } = props;

  const { colors } = useTheme();

  const rating = vote_average / 2;

  return (
    <Container {...rest}>
      <Wrapper>
        <Poster
          source={{ uri: `${apiImageUrl}${backdrop_path}` }}
          resizeMode="contain"
        />

        <RatingCard>
          <Star
            size={16}
            color={colors.screens.home.components.upcomingCard.icon}
            weight="fill"
          />
          <Rating>{rating.toFixed(1)}</Rating>
        </RatingCard>
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export { UpcomingCardWrapper, UpcomingCardTitle };
