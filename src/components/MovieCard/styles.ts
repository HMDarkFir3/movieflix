import styled, { css } from "styled-components/native";

import { SCREEN_WIDTH } from "@utils/constants";

export const Container = styled.Pressable``;

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

export const RatingCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 8px;
  left: 8px;

  height: 24px;

  padding: 0 8px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
`;

export const Rating = styled.Text`
  margin-left: 4px;

  font-size: 12px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text10};
  `}
`;

export const MovieCardWrapper = styled.View`
  padding: 0 20px;
  margin-top: 28px;
`;

export const MovieCardTitle = styled.Text`
  font-size: 24px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text10};
  `}
`;

export const MovieCardSeparator = styled.View`
  margin-left: 16px;
`;
