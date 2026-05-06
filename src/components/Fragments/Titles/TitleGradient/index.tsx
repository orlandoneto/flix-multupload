import { GradientText, TextContainer, Title } from './styles';

type Props = {
  textFirstPart?: string;
  textSecondPart?: string;
  textThirdPart?: string;
};

export const TitleGradient = ({ textFirstPart, textSecondPart, textThirdPart }: Props) => (
  <Title>
    <TextContainer>
      {textFirstPart}
      <GradientText> {textSecondPart} </GradientText>
      {textThirdPart}
    </TextContainer>
  </Title>
);
