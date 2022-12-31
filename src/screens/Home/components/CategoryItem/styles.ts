import styled, { css } from "styled-components/native";
import { PressableProps } from "react-native";

interface TitleProps {
  isActive: boolean;
}

export const Container = styled.Pressable.attrs<PressableProps>(
  ({ theme }) => ({
    android_ripple: {
      color: theme.colors.androidRipple.primary,
    },
  })
)`
  padding: 8px 12px;
`;

export const Title = styled.Text<TitleProps>`
  text-transform: capitalize;
  font-size: 16px;
  ${({ theme, isActive }) => css`
    font-family: ${theme.fonts.medium};
    color: ${isActive
      ? theme.colors.screens.home.components.categoryItem.isActive
      : theme.colors.screens.home.components.categoryItem.isNotActive};
  `}
`;

export const CategoryItemWrapper = styled.View``;
