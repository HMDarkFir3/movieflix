import styled, { css } from 'styled-components/native';

import { SCREEN_WIDTH } from '@utils/constants';

export const Container = styled.View``;

export const Poster = styled.Image`
  width: ${SCREEN_WIDTH / 3}px;
  height: ${SCREEN_WIDTH / 2}px;

  border-radius: 12px;
`;

export const EmptyPoster = styled.View`
  align-items: center;
  justify-content: center;

  width: ${SCREEN_WIDTH / 3}px;
  height: ${SCREEN_WIDTH / 2}px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
`;

export const Name = styled.Text`
  width: ${SCREEN_WIDTH / 3}px;

  margin-top: 8px;

  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;

export const How = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.primary};
  `}
`;

export const Character = styled.Text`
  width: ${SCREEN_WIDTH / 3}px;

  margin-top: 8px;

  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;

export const ActorCardWrapper = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const ActorCardTitle = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;
