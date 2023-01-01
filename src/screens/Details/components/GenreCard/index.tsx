import { FC } from "react";

import { Container, Title, GenreCardSeparator } from "./styles";

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

export { GenreCardSeparator };
