import { css } from 'styled-components';
// Importando fontes em diferentes formatos
import PoppinsSemiBoldTTF from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsSemiBoldWOFF2 from '../assets/fonts/Poppins-SemiBold.woff2';

import PoppinsRegularTTF from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsRegularWOFF2 from '../assets/fonts/Poppins-Regular.woff2';

// Preload das fontes críticas (apenas WOFF2 para melhor performance)
export const FontPreload = `
  <link 
    rel="preload" 
    href="${PoppinsRegularWOFF2}" 
    as="font" 
    type="font/woff2" 
    crossorigin="anonymous"
  />
  <link 
    rel="preload" 
    href="${PoppinsSemiBoldWOFF2}" 
    as="font" 
    type="font/woff2" 
    crossorigin="anonymous"
  />
`;

export const FontStyle = css`
  @font-face {
    font-family: 'PoppinsSemiBold';
    src: url(${PoppinsSemiBoldWOFF2}) format('woff2'),
         url(${PoppinsSemiBoldTTF}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    unicode-range: U+000-5FF; /* Latin */
  }

  @font-face {
    font-family: 'PoppinsRegular';
    src: url(${PoppinsRegularWOFF2}) format('woff2'),
         url(${PoppinsRegularTTF}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    unicode-range: U+000-5FF; /* Latin */
  }
`;
