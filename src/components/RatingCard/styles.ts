import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;

  position: absolute;
  top: 8px;
  left: 8px;

  height: 24px;

  padding: 0 8px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
`;

export const Rating = styled.Text`
  font-size: 12px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text10};
  `}
`;
