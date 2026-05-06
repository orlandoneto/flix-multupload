import styled from 'styled-components';

export const SliderContainer = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  max-width: 600px; /* Largura máxima do slider */
  margin: 0 auto;
`;

export const SlideContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

interface SlideProps {
  active: boolean;
}

export const Slide = styled.div<SlideProps>`
  flex: 0 0 100%;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => (props.active ? '0' : '-100%')});
`;

export const SlideImage = styled.img`
  width: 100%;
  height: auto; /* Ajusta a altura conforme a largura */
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;
