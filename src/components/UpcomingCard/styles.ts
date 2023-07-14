import styled, { css } from 'styled-components/native';

import { SCREEN_WIDTH } from '@/utils/constants';

export const Container = styled.Pressable`
  width: ${SCREEN_WIDTH}px;
`;

export const Wrapper = styled.View`
  padding: 0 20px;
`;

export const RatingCardWrapper = styled.View`
  position: absolute;
  left: 20px;
`;

export const Poster = styled.Image`
  height: 192px;

  border-radius: 12px;
`;

export const Title = styled.Text`
  position: absolute;
  left: 28px;
  bottom: 8px;

  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text10};
  `}
`;

export const UpcomingCardWrapper = styled.View`
  margin-top: 20px;
`;

export const UpcomingCardTitle = styled.Text`
  margin-left: 20px;

  font-size: 24px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text10};
  `}
`;
