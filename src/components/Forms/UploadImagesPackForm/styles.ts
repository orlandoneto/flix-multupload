import styled from 'styled-components';
import { theme } from '../../../theme/index';

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #0a1218;
  padding: 40px 30px;
  margin: 20px auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    padding: 50px 40px;
    margin: 30px auto;
  }

  @media (min-width: 1024px) {
    padding: 60px 50px;
  }
`;

export const FormGroup = styled.div`
  padding-bottom: 24px;
  
  @media (max-width: 480px) {
    padding-bottom: 20px;
  }
`;

export const Label = styled.label`
  color: #6e7175;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  margin-bottom: 8px;
  display: block;
  font-weight: 600;

  a {
    color: #da1b47;
  }

  span {
    margin-left: 5px;
    color: #da1b47;
    font-weight: 700;
  }
`;

export const HelperText = styled.p`
  color: #6e7175;
  font-size: 12px;
  margin: 8px 0 12px;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin: 6px 0 10px;
  }
`;

export const UploadArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  height: 140px;
  border: 2px dashed #ffffff;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Oculta qualquer UI do Uppy DragDrop caso algo injete estilos/HTML */
  .uppy-DragDrop,
  .uppy-Root,
  .uppy-Container,
  [class*='uppy-DragDrop'] {
    display: none !important;
  }

  &:hover {
    border-color: #ffffff;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.12);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.08);
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  .upload-content {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 480px) {
    height: 100px;
    font-size: 14px;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  
  .uppy-ProgressBar {
    background-color: #2a3a4a;
    border-radius: 8px;
    overflow: hidden;
    height: 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .uppy-ProgressBar-bar {
    background: linear-gradient(90deg, #4a90e2, #5ba0f2);
    border-radius: 8px;
    transition: width 0.3s ease;
  }
`;

export const FileList = styled.div`
  margin-top: 16px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: 4px 0;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const FileName = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  word-break: break-word;
`;

export const FileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryRequired = styled.div`
  color: #ff2d55;
  font-size: 13px;
  margin-top: 6px;
  padding: 8px 12px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border-left: 3px solid #ff2d55;
`;

export const ErrorMessage = styled.div`
  color: #ff2d55;
  font-size: 13px;
  margin: 8px 0;
  padding: 10px 12px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border-left: 3px solid #ff2d55;
`;

export const SelectWrapper = styled.div`
  position: relative;
  
  select {
    width: 100%;
    padding: 14px 16px;
    font-size: 14px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background: linear-gradient(135deg, #2a3a4a 0%, #1a2b38 100%);
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 16px;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.4);
    }

    option {
      background: #2a3a4a;
      color: #ffffff;
      padding: 12px;
    }
  }
`;
