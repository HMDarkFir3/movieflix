import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 4px 8px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text10};
  `}
`;

export const GenreCardWrapper = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const GenreCardTitle = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;
