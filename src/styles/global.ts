import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';
import { FontStyle } from './fonts';

export const GlobalStyle = createGlobalStyle`
  ${FontStyle}

  body {
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-family: ${theme.fonts.semiBold}, sans-serif;
    background-color: ${theme.colors.background.main};
    overflow-x: hidden;
    max-width: 100vw;
  }

  body, button, textarea, p {
    font-size: 1rem;
    font-family: ${theme.fonts.semiBold}, sans-serif;
    color: ${theme.colors.text.main};
  }

  p {
    margin: 0;
    padding: 0;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    text-align: center;
    cursor: pointer;
  }
`;
