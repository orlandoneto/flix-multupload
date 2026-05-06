import styled from 'styled-components';
import { theme } from '../../../theme/index';

// 11 cols minmax(150px, 1fr)
//const colsGridDesktop = "150px";
// 8 cols minmax(200px, 1fr)
//const colsGridDesktop = "200px";

// 1 cols repeat(1, 1fr)
//const colsGridMobile = 1;
// 2 cols repeat(2, 1fr)
//const colsGridMobile = 2;
// 3 cols repeat(3, 1fr)
//const colsGridMobile = 3;

export const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ImageWrapper = styled.button`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px; /* Define o border-radius */
  overflow: hidden; /* Garante que o conteúdo não ultrapasse o border-radius */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta a imagem para cobrir o contêiner */
    display: block; /* Remove o espaço extra abaixo da imagem */
    border-radius: inherit; /* Garante que a borda arredondada da imagem se alinhe com o wrapper */
  }
`;

export const NoItemsMessage = styled.div`
  display: flex;
  width: 350px;
  color: ${theme.colors.white};
  font-size: 14px;
  text-align: center;
  flex-wrap: nowrap;
`;

// Estilos específicos para resolver o problema do espaço vazio
export const MasonryWrapper = styled.div`
  width: 100%;
  
  /* Garantir que o container ocupe toda a largura disponível */
  .masonic-grid {
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
  }
  
  /* Forçar os itens a ocuparem o espaço disponível */
  .masonic-grid > div {
    width: 100% !important;
    flex: 1 1 auto !important;
  }
  
  /* Ajustar margens para eliminar espaços vazios */
  .masonic-grid > div > div {
    margin: 6px !important;
  }
  
  /* Responsividade para diferentes tamanhos de tela */
  @media (max-width: 1200px) {
    .masonic-grid > div > div {
      margin: 4px !important;
    }
  }
  
  @media (max-width: 768px) {
    .masonic-grid > div > div {
      margin: 3px !important;
    }
  }
`;
