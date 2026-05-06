import React from 'react';
import { Container, DescriptionText, SubscribeButton, Title } from './styles';

interface PlanBoxProps {
  title: string;
  description: string;
  buttonText: string;
  colorButton?: string;
  textColorButton?: string;
  handlePlanData: () => void;
}

const PlanUpdateBox: React.FC<PlanBoxProps> = ({
  title,
  description,
  buttonText,
  colorButton,
  textColorButton,
  handlePlanData,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <DescriptionText>{description}</DescriptionText>
      <SubscribeButton
        onClick={handlePlanData}
        colorButton={colorButton}
        textColorButton={textColorButton}
      >
        {buttonText}
      </SubscribeButton>
    </Container>
  );
};

export default PlanUpdateBox;
