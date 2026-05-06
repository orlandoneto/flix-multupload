import styled from 'styled-components';

interface ContainerProps {
  fontSize?: string;
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: flex-start;

  @media (max-width: 1150px) {
    max-width: 100%;
    width: 100%;
    padding: 0 16px;
  }

  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    padding: 0 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 0;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
  }

  & > div:first-child {
    margin-right: 0;
    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
`;

interface LogoDfProps {
  width?: string;
  height?: string;
}

export const LogoDf = styled.img<LogoDfProps>`
  width: ${(props) => props.width || '0'};
  height: ${(props) => props.height || '0'};
  margin-bottom: 10px;
`;

interface DescriptionProps {
  fontSize?: string;
  color?: string;
}

export const Description = styled.p<DescriptionProps>`
  text-align: center;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  color: ${({ color }) => color || 'inherit'};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  word-break: break-word;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 24px;
  margin-right: 24px;
  max-width: 250px;
  width: 100%;  

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    margin-bottom: 32px;
    font-size: 11.5px;
  }
`;

export const LinksSection = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  @media (max-width: 900px) {
    gap: 12px;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 8px;
    align-items: stretch;
    width: 100%;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 170px;
  max-width: 170px;
  flex: 1 1 170px;
  margin-bottom: 16px;
  @media (max-width: 900px) {
    min-width: 140px;
    max-width: 140px;
  }
  @media (max-width: 768px) {
    min-width: unset;
    max-width: 100%;
    align-items: center;
    text-align: center;
    margin-bottom: 12px;
  }
  h3 {
    color: #fff;
    font-size: 16px;
    font-family: ${({ theme }) => theme.fonts.semiBold};
    margin-bottom: 8px;
    font-weight: bold;
    letter-spacing: 0.5px;
    @media (max-width: 768px) {
      text-align: center;
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    margin-bottom: 8px;
    text-align: left;
    @media (max-width: 768px) {
      text-align: center;
    }
  }
`;

interface SocialIconProps {
  width?: number;
  height?: number;
}

export const SocialIconArea = styled.div<SocialIconProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;

  & > a > img {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    object-fit: contain;
  }

  @media (max-width: 900px) {
    gap: 8px;
    & > a > img {
      width: 26px;
      height: 26px;
    }
  }
  @media (max-width: 600px) {
    justify-content: center;
    width: 100%;
    & > a > img {
      width: 22px;
      height: 22px;
      margin-bottom: 4px;
    }
  }
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

export const StyledLink = styled.a<{
  color?: string;
  fontSize?: string;
}>`
  color: #bfc6cc;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: 400;
  text-decoration: none;
  transition: color 0.2s, text-decoration 0.2s;
  display: inline-block;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
