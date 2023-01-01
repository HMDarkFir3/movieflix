import { FC } from "react";

import {
  Container,
  Title,
  GenreCardWrapper,
  GenreCardTitle,
  GenreCardSeparator,
} from "./styles";

interface Props {
  title: string;
}

export const GenreCard: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export { GenreCardWrapper, GenreCardTitle, GenreCardSeparator };
