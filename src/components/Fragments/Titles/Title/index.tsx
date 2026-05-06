import React from 'react';
import { H1, H2, H3, H4, H5, H6 } from './styles';

type Props = {
  type?: string;
  text?: string;
  color?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
};

export const Title: React.FC<Props> = ({ type, text, color, pt, pr, pb, pl, mt, mr, mb, ml }) => {
  const findByTypeTagH = (
    type: string,
    text: string,
    color?: string,
    pt?: string,
    pr?: string,
    pb?: string,
    pl?: string,
    mt?: string,
    mr?: string,
    mb?: string,
    ml?: string
  ) => {
    switch (type) {
      case 'h1':
        return (
          <H1 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H1>
        );
      case 'h2':
        return (
          <H2 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H2>
        );
      case 'h3':
        return (
          <H3 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H3>
        );
      case 'h4':
        return (
          <H4 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H4>
        );
      case 'h5':
        return (
          <H5 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H5>
        );
      case 'h6':
        return (
          <H6 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H6>
        );
      default:
        return (
          <H1 pt={pt} pr={pr} pb={pb} pl={pl} mt={mt} mr={mr} mb={mb} ml={ml} color={color}>
            {text}
          </H1>
        );
    }
  };

  return findByTypeTagH(type || 'h1', text || '', color, pt, pr, pb, pl, mt, mr, mb, ml);
};
