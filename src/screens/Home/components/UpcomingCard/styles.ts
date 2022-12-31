import styled, { css } from "styled-components/native";

import { SCREEN_WIDTH } from "@utils/variables";

interface CertificationCardProps {
  isAdult: boolean;
}

export const Container = styled.Pressable`
  width: ${SCREEN_WIDTH}px;
`;

export const Wrapper = styled.View`
  padding: 0 20px;
`;

export const Poster = styled.Image`
  height: 192px;

  border-radius: 12px;
`;

export const CertificationCard = styled.View<CertificationCardProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 8px;
  left: 28px;

  height: 24px;

  border-radius: 8px;

  ${({ theme, isAdult }) =>
    isAdult
      ? css`
          width: 32px;
          background-color: ${theme.colors.screens.home.components.upcomingCard
            .certification.adult};
        `
      : css`
          width: 24px;
          background-color: ${theme.colors.screens.home.components.upcomingCard
            .certification.free};
        `}
`;

export const Certification = styled.Text`
  font-size: 12px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.screens.home.components.upcomingCard.text};
  `}
`;

export const RatingCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 8px;
  right: 28px;

  height: 24px;

  padding: 0 8px;

  background-color: ${({ theme }) =>
    theme.colors.screens.home.components.upcomingCard.background};
  border-radius: 8px;
`;

export const Rating = styled.Text`
  margin-left: 4px;

  font-size: 12px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.screens.home.components.upcomingCard.text};
  `}
`;

export const Title = styled.Text`
  position: absolute;
  left: 28px;
  bottom: 8px;

  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.screens.home.components.upcomingCard.text};
  `}
`;

export const UpcomingCardWrapper = styled.View`
  margin-top: 20px;
`;

export const UpcomingCardTitle = styled.Text`
  margin-left: 20px;

  font-size: 32px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.screens.home.components.upcomingCard.text};
  `}
`;
