import { FC } from "react";
import { useTheme } from "styled-components/native";
import { Star } from "phosphor-react-native";

import { apiImageUrl } from "@services/api";

import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";

import {
  Container,
  Wrapper,
  Poster,
  CertificationCard,
  Certification,
  RatingCard,
  Rating,
  Title,
  UpcomingCardWrapper,
  UpcomingCardTitle,
} from "./styles";

interface Props {
  data: UpcomingDTO.Results;
}

export const UpcomingCard: FC<Props> = (props) => {
  const { backdrop_path, title, adult } = props.data;

  const { colors } = useTheme();

  return (
    <Container>
      <Wrapper>
        <Poster
          source={{ uri: `${apiImageUrl}${backdrop_path}` }}
          resizeMode="contain"
        />
        <CertificationCard isAdult={adult}>
          <Certification>{adult ? "18+" : "L"}</Certification>
        </CertificationCard>

        <RatingCard>
          <Star
            size={16}
            color={colors.screens.home.components.upcomingCard.star}
            weight="fill"
          />
          <Rating>8.5</Rating>
        </RatingCard>
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export { UpcomingCardWrapper, UpcomingCardTitle };
