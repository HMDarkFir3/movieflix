import styled from 'styled-components/native';

import { STATUS_BAR_HEIGHT } from '@/utils/constants';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.View`
  flex: 1;

  margin-top: ${STATUS_BAR_HEIGHT + 20}px;
`;
