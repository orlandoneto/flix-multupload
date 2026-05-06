import styled, { css } from 'styled-components';
import { theme } from '../../../../theme';

interface TextBaseProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
}

const H1 = styled.h1<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

// Estilo específico para H2
const H2 = styled.h2<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

// Estilo específico para H3
const H3 = styled.h3<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

// Estilo específico para H4
const H4 = styled.h4<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

// Estilo específico para H5
const H5 = styled.h5<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

// Estilo específico para H6
const H6 = styled.h6<TextBaseProps>`
  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color }: TextBaseProps) => css`
    padding-top: ${pt || '0'}px;
    padding-right: ${pr || '0'}px;
    padding-bottom: ${pb || '0'}px;
    padding-left: ${pl || '0'}px;
    margin-top: ${mt || '0'}px;
    margin-right: ${mr || '0'}px;
    margin-bottom: ${mb || '0'}px;
    margin-left: ${ml || '0'}px;
    color: ${color || 'inherit'};
    font-family: ${theme.fonts.semiBold};
  `}
`;

export { H1, H2, H3, H4, H5, H6 };
