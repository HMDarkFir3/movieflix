import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

interface WrapperProps {
  isActive: boolean;
}

interface NameProps {
  isActive: boolean;
}

export const Container = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Wrapper = styled.View<WrapperProps>`
  align-items: center;
  padding: 8px 16px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.primary};
    `}
`;

export const Name = styled.Text<NameProps>`
  font-size: 12px;
  ${({ theme, isActive }) => css`
    font-family: ${isActive ? theme.fonts.bold : theme.fonts.regular};
    color: ${isActive ? theme.colors.primary : theme.colors.text10};
  `}
`;

export const SeasonCardWrapper = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const SeasonCardTitle = styled.Text`
  font-size: 24px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;
