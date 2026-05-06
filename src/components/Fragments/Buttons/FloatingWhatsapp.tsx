import React from 'react';
import styled from 'styled-components';
import { Whatsapp } from '../../../assets/svg';
import { WHATSAPP_NUMBER } from '../../../utils/constants';

const WhatsappButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

const FloatingWhatsapp: React.FC = () => {
  return (
    <WhatsappButton
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Gostaria%20de%20falar%20com%20você,%20flixdesign.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
    >
      <img src={Whatsapp} alt="WhatsApp" />
    </WhatsappButton>
  );
};

export default FloatingWhatsapp;