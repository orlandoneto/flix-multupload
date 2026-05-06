import styled from 'styled-components';
import { theme } from '~/theme';

export const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #0a1218;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
  }
`;

export const AreaProfileImage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 1px;
  background-color: #da1b47;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #0a1218;
  padding: 3px;
  object-fit: cover;
`;

export const EditIcon = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #161e24;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AreaName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  gap: 8px;
`;

export const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0; /* permite truncamento dentro */
  flex: 1;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const UserName = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-right: 0;
  font-family: ${theme.fonts.semiBold};
  color: #f3f3f3;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: calc(100% - 28px);
  }
`;

export const ContributorBadge = styled.span`
  font-size: 12px;
  color: #6e7175;
  line-height: 1;
  margin-bottom: 4px;
`;

export const LocationArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    color: #6e7175;
    font-family: ${theme.fonts.regular};
    font-size: 18x;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  div {
    text-align: center;

    strong {
      display: block;
      font-size: 12px;
      color: #f3f3f3;
      font-family: ${theme.fonts.semiBold};

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }

    span {
      font-size: 12px;
      color: #f3f3f3;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #292d32;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

// Refatorar e criar um componente de botão
export const SidebarButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: #da1b47;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #11181d;
  }

  &:disabled {
    background-color: #161e24;
    cursor: not-allowed;
    color: #b3b3b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;
