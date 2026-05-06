import styled from 'styled-components';
import { theme } from '~/theme';

export const ModalOverlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    overflow-y: auto;
    touch-action: pan-y;
    align-items: center;
    justify-content: center;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #0a1218;
  border-radius: 10px;
  max-width: 90%;
  width: 900px;
  height: 600px;
  padding: 20px;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    height: 100vh;
    min-height: 0;
    padding: 0 0 80px 0;
    overflow-y: auto;
    box-sizing: border-box;
  }
`;

export const LeftSection = styled.div`
  width: 70%;
  height: 100%;
  margin-right: 20px;
  background-color: #0A1218;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    max-height: 520px;
    background: #18181b;
    display: block;
  }

  @media (max-width: 768px) {
    /* Mantém como no desktop, sem expandir desnecessariamente */
    img {
      width: 100vw;
      max-width: 100vw;
      height: auto;
      max-height: 420px;
      border-radius: 0;
      display: block;
      background: #18181b;
    }
  } 

  .modal-tag-overlay {
    position: absolute;
    top: 12px;
    left: 8px;
    z-index: 2;
  }
  .modal-close-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
  }
`;

export const RightSection = styled.div`
  /* Simula o gap entre os elementos */
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  flex-direction: column;
  justify-content: space-between;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    position: static;
  }
`;

export const AreaTags = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  justify-self: center;
  align-items: center;
`;

export const TagsSection = styled.div`
  display: flex;
`;

export const CategoryBadge = styled.div`
  background-color: #da1b47;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-left: 5px;
  align-self: flex-start;

  p {
    color: #f3f3f3;
    font-family: ${theme.fonts.semiBold};
    font-size: 14px;
  }
`;

export const Title = styled.h2`
  color: #f3f3f3;
  font-family: ${theme.fonts.semiBold};
  margin: 0;
  padding: 0;
`;

export const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    color: #f3f3f3;
    font-family: ${theme.fonts.regular};
    font-size: 14px;

    &:before {
      content: '✔';
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: white;
      color: #0a1218;
      margin-right: 10px;
      font-size: 12px;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
  }

  .save {
    background-color: transparent;
    border: 1px solid #da1b47;
    border-radius: 8px;
    color: #da1b47;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ${theme.fonts.semiBold};
    font-size: 14px;
    height: 35px;
  }

  .report {
    background-color: #161e24;
    color: #f3f3f3;
    border: none;
    border-radius: 60px;
    font-family: ${theme.fonts.regular};
    font-size: 14px;
    height: 35px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    button, .save, .report {
      width: 100% !important;
      min-width: 0;
      margin-bottom: 0;
    }
    .save {    
      align-items: center;
      justify-content: center;   
    }
  }
`;

export const AreaInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #ec561d;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(236, 86, 29, 0.2);

  p {
    color: #f3f3f3;
    font-size: 12px;
    font-family: ${theme.fonts.regular};
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-info {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 14px;
      color: #f3f3f3;
      font-family: ${theme.fonts.semiBold};
    }

    span {
      font-size: 12px;
      color: #6e7175;
      font-family: ${theme.fonts.semiBold};
    }
  }
`;

export const AreaUserProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    object-fit: cover;
  }
`;

export const FollowButton = styled.button`
  background-color: #da1b47;
  color: #f3f3f3;
  border: none;
  padding: 8px 20px;
  border-radius: 60px;
  cursor: pointer;
  font-family: ${theme.fonts.semiBold};
  font-size: 14px;
  display: flex;
  align-items: center;
`;
