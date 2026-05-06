import styled from 'styled-components';

export const Container = styled.div``;

interface AreaProps {
  width: number | string;
  height: number | string;
  borderRadius: number;
}

export const Area = styled.div<AreaProps>`
  background-color: white;
  margin: 10px;
  padding: 10px;
  width: ${(props) => props.width || 300};
  height: ${(props) => props.height || 'auto'};
  border-radius: ${(props) => props.borderRadius || 10}px;
  flex: none;
`;

export const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.span`
  display: block;
  text-align: center;
  color: #1e1e1e;
  padding: 5px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #00a8fb;
`;

export const OldPrice = styled.span`
  font-size: 0.8rem;
  text-decoration: line-through;
  flex-grow: 1;
  color: #e81a5d;
`;

export const Price = styled.span`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #ff7e3b;
`;
