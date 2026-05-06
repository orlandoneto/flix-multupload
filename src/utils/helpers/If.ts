import React from 'react';

interface Props {
  condition: boolean;
  children: any;
}

export const If: React.FC<Props> = ({ condition, children }) => {
  if (condition) {
    return children;
  } else {
    return null;
  }
};
