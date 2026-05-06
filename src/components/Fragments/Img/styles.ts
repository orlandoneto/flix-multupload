import styled from 'styled-components';

interface TextProps {
  color?: string;
  fontSize?: string;
}

export const Text = styled.p<TextProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) => props.color || 'white'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  margin: 2px 2px;
`;
