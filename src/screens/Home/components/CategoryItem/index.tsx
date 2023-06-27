import { FC } from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title, CategoryItemWrapper } from "./styles";

interface Props extends RectButtonProps {
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

export { CategoryItemWrapper };
