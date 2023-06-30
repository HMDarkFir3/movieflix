import { FC } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { DetailsDTO } from '@dtos/Serie/DetalsDTO';

import { Container, Wrapper, Name, SeasonCardWrapper, SeasonCardTitle } from './styles';

interface Props extends RectButtonProps {
  data: DetailsDTO.Season;
  isActive: boolean;
}

export const SeasonCard: FC<Props> = (props) => {
  const { name, season_number } = props.data;
  const { isActive, ...rest } = props;

  const formmattedName = season_number >= 1 ? season_number : name;

  return (
    <Container {...rest}>
      <Wrapper isActive={isActive}>
        <Name isActive={isActive}>{formmattedName}</Name>
      </Wrapper>
    </Container>
  );
};

export { SeasonCardWrapper, SeasonCardTitle };
