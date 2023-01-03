import { FC } from "react";
import { PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { FileX, Star } from "phosphor-react-native";

import { apiImageUrl } from "@services/api";

import { PopularDTO } from "@dtos/Movie/PopularDTO";

import {
  Container,
  Poster,
  EmptyPoster,
  RatingCard,
  Rating,
  MovieCardWrapper,
  MovieCardTitle,
  MovieCardSeparator,
} from "./styles";

interface Props extends PressableProps {
  data: PopularDTO.Result;
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
          <FileX
            size={40}
            color={colors.screens.home.components.movieCard.iconPrimary}
          />
        </EmptyPoster>
      )}

      <RatingCard>
        <Star
          size={16}
          color={colors.screens.home.components.movieCard.iconSecondary}
          weight="fill"
        />
        <Rating>{rating}</Rating>
      </RatingCard>
    </Container>
  );
};

export { MovieCardWrapper, MovieCardTitle, MovieCardSeparator };
