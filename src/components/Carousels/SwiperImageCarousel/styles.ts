import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

interface ContentProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  justify-content: center; // Centralizado
  width: 100%;
  text-align: center; // Texto centralizado
  ${({ pt, pr, pb, pl, mt, mr, mb, ml }: ContentProps) => css`
    padding-top: ${pt || 'none'};
    padding-right: ${pr || 'none'};
    padding-bottom: ${pb || 'none'};
    padding-left: ${pl || 'none'};
    margin-top: ${mt || 'none'};
    margin-right: ${mr || 'none'};
    margin-bottom: ${mb || 'none'};
    margin-left: ${ml || 'none'};
  `}
`;

export const StyledSwiper = styled.div`
  position: relative;
  margin: 10px 0; // Reduzido ainda mais
  
  .swiper {
    padding: 0 30px; // Reduzido drasticamente
  }
  
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0px; // ZERO espaçamento entre slides
  }
  
  // Estilos personalizados para a paginação
  .swiper-pagination-custom {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  
  .swiper-pagination-bullet-custom {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
      transform: scale(1.2);
    }
  }
  
  .swiper-pagination-bullet-active-custom {
    background: linear-gradient(135deg, #DA1B47, #FF6B35);
    border-color: rgba(218, 27, 71, 0.5);
  }
  
  // Responsividade
  @media (max-width: 1200px) {
    .swiper {
      padding: 0 25px; // Reduzido drasticamente
    }
    
    .swiper-slide {
      padding: 0 0px; // ZERO espaçamento
    }
  }
  
  @media (max-width: 768px) {
    margin: 8px 0; // Reduzido ainda mais
    
    .swiper {
      padding: 0 20px; // Reduzido drasticamente
    }
    
    .swiper-slide {
      padding: 0 0px; // ZERO espaçamento
    }
    
    .swiper-pagination-bullet-custom {
      width: 10px;
      height: 10px;
    }
  }
  
  @media (max-width: 480px) {
    .swiper {
      padding: 0 15px; // Reduzido drasticamente
    }
    
    .swiper-slide {
      padding: 0 0px; // ZERO espaçamento
    }
  }
`;

interface NavigationButtonProps {
  direction: 'left' | 'right';
}

export const NavigationButton = styled.button<NavigationButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'left' ? 'left: -60px' : 'right: -60px'};
  
  width: 50px;
  height: 50px;
  background: rgba(10, 18, 24, 0.95);
  border: 2px solid rgba(218, 27, 71, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(218, 27, 71, 0.9);
    border-color: rgba(218, 27, 71, 0.8);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(218, 27, 71, 0.4);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  color: white;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  
  // Responsividade
  @media (max-width: 1200px) {
    ${({ direction }) => direction === 'left' ? 'left: -50px' : 'right: -50px'};
    width: 45px;
    height: 45px;
    font-size: 22px;
  }
  
  @media (max-width: 768px) {
    ${({ direction }) => direction === 'left' ? 'left: 5px' : 'right: 5px'};
    width: 40px;
    height: 40px;
    background: rgba(10, 18, 24, 0.8);
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    ${({ direction }) => direction === 'left' ? 'left: 10px' : 'right: 10px'};
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
`;

export const PaginationContainer = styled.div`
  // Container para a paginação personalizada
`;
