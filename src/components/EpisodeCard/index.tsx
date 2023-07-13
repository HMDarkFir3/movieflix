import { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { FileX } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { SeasonDetailsDTO } from '@dtos/Serie/SeasonDetailsDTO';

import { RatingCard } from '@components/RatingCard';

import {
  Container,
  Wrapper,
  Poster,
  EmptyPoster,
  EpisodeNumberCard,
  EpisodeNumber,
  Name,
  EpisodeCardWrapper,
  EpisodeCardTitle,
} from './styles';

interface Props {
  data: SeasonDetailsDTO.Episode;
}

export const EpisodeCard: FC<Props> = (props) => {
  const {
    still_path: stillPath,
    episode_number: episodeNumber,
    name,
    vote_average: voteAverage,
  } = props.data;

  const { colors } = useTheme();

  const rating = voteAverage / 2;

  return (
    <Container>
      <Wrapper>
        {stillPath ? (
          <Poster source={{ uri: `${apiImageUrl}${stillPath}` }} resizeMode="cover" />
        ) : (
          <EmptyPoster>
            <FileX size={28} color={colors.text60} />
          </EmptyPoster>
        )}

        <EpisodeNumberCard>
          <EpisodeNumber>{episodeNumber}</EpisodeNumber>
        </EpisodeNumberCard>
        <RatingCard rating={rating} />
      </Wrapper>

      <Name>{name}</Name>
    </Container>
  );
};

export { EpisodeCardWrapper, EpisodeCardTitle };
