import { FC } from "react";
import { PressableProps } from "react-native";

import { Container, Title } from "./styles";

interface Props extends PressableProps {
  title: string;
  isActive: boolean;
}

export const CategoryItem: FC<Props> = (props) => {
  const { title, isActive, ...rest } = props;

  return (
    <Container {...rest}>
      <Title isActive={isActive}>{title}</Title>
    </Container>
  );
};
