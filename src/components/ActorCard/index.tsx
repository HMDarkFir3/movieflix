import { FC } from 'react';
import { useTheme } from 'styled-components/native';
import { FileX } from 'phosphor-react-native';

import { apiImageUrl } from '@services/api';

import { CreditsDTO } from '@dtos/Movie/CreditsDTO';

import {
  Container,
  Poster,
  EmptyPoster,
  Name,
  How,
  Character,
  ActorCardWrapper,
  ActorCardTitle,
} from './styles';

interface Props {
  data: CreditsDTO.Cast;
}

export const ActorCard: FC<Props> = (props) => {
  const { profile_path: profilePath, name, character } = props.data;

  const { colors } = useTheme();

  return (
    <Container>
      {profilePath ? (
        <Poster source={{ uri: `${apiImageUrl}${profilePath}` }} resizeMode="cover" />
      ) : (
        <EmptyPoster>
          <FileX size={28} color={colors.text60} />
        </EmptyPoster>
      )}

      <Name>
        {name} <How>how</How> <Character>{character}</Character>
      </Name>
    </Container>
  );
};

export { ActorCardWrapper, ActorCardTitle };
