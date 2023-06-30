import styled, { css } from 'styled-components/native';
import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { STATUS_BAR_HEIGHT } from '@utils/constants';

import { getScreenSizeForMovieDetails } from '@utils/getScreenSizeForMovieDetails';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const BackButton = styled(Pressable)`
  position: absolute;
  top: ${STATUS_BAR_HEIGHT + 20}px;
  left: 20px;

  z-index: 2;
`;

export const PosterWrapper = styled.View``;

export const Poster = styled.Image`
  width: 100%;
  height: ${getScreenSizeForMovieDetails()}px;

  z-index: 1;
`;

export const EmptyPoster = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${getScreenSizeForMovieDetails()}px;

  z-index: 1;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
`;

export const Gradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 108px;

  z-index: 2;
`;

export const Current = styled.Text`
  position: absolute;
  bottom: 12px;
  right: 20px;

  font-size: 16px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text10};
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
  padding: 0 20px;
`;

export const Box = styled.View`
  flex-direction: row;
`;

export const RatingCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

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

export const AddListButton = styled(Pressable)``;

export const Content = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text10};
  `}
`;

export const Overview = styled.Text`
  margin-top: 16px;

  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text60};
  `}
`;
