import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

interface TitleProps {
  isActive: boolean;
}

export const Container = styled(RectButton)`
  padding: 8px 12px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text<TitleProps>`
  text-transform: capitalize;
  font-size: 16px;
  ${({ theme, isActive }) => css`
    font-family: ${theme.fonts.medium};
    color: ${isActive ? theme.colors.primary : theme.colors.text10};
  `}
`;

export const CategoryItemWrapper = styled.View``;
