import React, { useState } from 'react';
import { Container, InputWrapper, Input, AreaSearch } from './styles';
import { searchOutlined } from '../../../assets/svg';
import { CustomImg } from '../../Fragments/Img';

type Props = {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
  minHeight?: number;
  maxWidth?: number;
  widthSearch?: string;
  onSearchChange: (terms: string) => void;
};

export const SearchInputMobile: React.FC<Props> = ({ onSearchChange, widthSearch, ...props }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchIcon = searchOutlined;
  const altText = 'Pesquisar por arquivos PDs e Packs';
  const placeholderText = 'Pesquisar recursos: Flyer, photoshop, artistas';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <Container {...props} ml="20px" mr="20px">
      <AreaSearch width={widthSearch}>
        <InputWrapper>
          <Input
            type="text"
            fontSize="16px"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={handleInputChange}
          />
          <CustomImg src={searchIcon} alt={altText} />
        </InputWrapper>
      </AreaSearch>
    </Container>
  );
};
