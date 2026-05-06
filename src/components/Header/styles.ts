import styled from 'styled-components';
import { theme } from '../../theme';

export const WrapperContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.light};
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    flex-direction: row;
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;

export const AreaLogo = styled.div`
  font-weight: bold;
  display: flex;

  @media (max-width: 768px) {
    padding-left: 1rem;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
`;

export const LeftContainer = styled.div`
  display: flex;

  margin-left: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 1rem;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 1rem;
  }

  a img {
    border-radius: 50%;
    object-fit: cover;
    width: 32px;
    height: 32px;
  }
`;

export const SanduichContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;
