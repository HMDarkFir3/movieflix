import styled, { css } from "styled-components/native";

interface TitleProps {
  isActive: boolean;
}

export const Container = styled.Pressable``;

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
