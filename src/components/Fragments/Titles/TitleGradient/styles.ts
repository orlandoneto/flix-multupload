import styled from 'styled-components';
import { theme } from '../../../../theme';

export const GradientText = styled.span`
  background: linear-gradient(
    to right,
    ${theme.colors.background.gradient1},
    ${theme.colors.background.gradient2}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: white;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    padding: 1rem;
  }
`;

export const TextContainer = styled.div`
  margin: 0;
  display: inline;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;
