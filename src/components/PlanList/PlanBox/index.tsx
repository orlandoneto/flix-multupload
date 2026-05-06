import React, { useEffect, useState } from 'react';
import { Check } from '../../../assets/svg';
import { CheckItem, CheckList, Container, Info, Price, SubscribeButton, Title } from './styles';

interface PlanBoxProps {
  index: number;
  title: string;
  features: string[];
  price: string;
  buttonText: string;
  firstColor?: string;
  secondColor?: string;
  colorButton?: string;
  colorButtonDisabled?: string;
  textColorButton?: string;
  tablePlanId?: number;
  existePlan?: (currentPlanId: number) => Promise<boolean>;
  handlePlanData: () => void;
}

const PlanBox: React.FC<PlanBoxProps> = ({
  index,
  title,
  features,
  price,
  buttonText,
  firstColor,
  secondColor,
  colorButton,
  colorButtonDisabled,
  textColorButton,
  tablePlanId,
  existePlan,
  handlePlanData,
}) => {
  const [planActive, setPlanActive] = useState(false);
  const CheckIcon = Check;

  useEffect(() => {
    const checkPlan = async () => {
      if (!existePlan) return;
      const isActive = await existePlan(tablePlanId || 0);
      setPlanActive(isActive);
    };

    checkPlan();
  }, [tablePlanId, existePlan]);

  return (
    <Container firstColor={firstColor} secondColor={secondColor}>
      <Title>{title}</Title>
      <CheckList>
        {features.map((feature, index) => (
          <CheckItem key={index}>
            <img src={CheckIcon} alt={feature} />
            <Info>{feature}</Info>
          </CheckItem>
        ))}
      </CheckList>
      <Price>{price}</Price>

      {index === 0 ? (
        !planActive ? (
          <></>
        ) : (
          <SubscribeButton
            disabled={true}
            onClick={handlePlanData}
            colorButton={colorButton}
            textColorButton={textColorButton}
            colorButtonDisabled={colorButtonDisabled}
          >
            Plano Padrão
          </SubscribeButton>
        )
      ) : (
        <SubscribeButton
          disabled={planActive}
          onClick={handlePlanData}
          colorButton={colorButton}
          textColorButton={textColorButton}
          colorButtonDisabled={colorButtonDisabled}
        >
          {planActive ? 'Plano Ativo' : buttonText}
        </SubscribeButton>
      )}

    </Container>
  );
};

export default PlanBox;
