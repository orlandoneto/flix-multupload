import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileFormats } from '~/utils/constants';
import { useUserDataCache } from '~/utils/hook';
import { searchOutlined } from '../../assets/svg';
import { CustomImg } from '../Fragments/Img';
import {
  AreaSearch,
  ButtonSearch,
  Container,
  Divider,
  Input,
  InputWrapper,
  Select,
} from './styles';

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
  redirectTo?: boolean;
  onSearchChange?: (terms: string, format: string) => void;
};

export const SearchInput: React.FC<Props> = ({ onSearchChange, ...props }) => {
  const navigate = useNavigate();
  const user = useUserDataCache();

  const visibleFormats = useMemo(() => {
    const isAllowed = user?.email === 'arlinofilho@gmail.com';
    return isAllowed ? fileFormats : fileFormats.filter((f) => f !== 'GRATIS');
  }, [user?.email]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(visibleFormats[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visibleFormats.includes(selectedFormat)) {
      setSelectedFormat(visibleFormats[0]);
    }
  }, [visibleFormats, selectedFormat]);

  const searchIcon = searchOutlined;
  const altText = 'Pesquisar por arquivos e packs';
  const placeholderText = 'Pesquisar recursos: Flyer, photoshop, artistas';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedFormat(event.target.value);

  const handleSearchClick = () => {
    setLoading(true);
    let format = selectedFormat === 'Escolha o Formato' ? '' : selectedFormat;
    if (searchTerm && format) {
      navigate(`/searchImage/${searchTerm}/${format}`);
    } else if (searchTerm) {
      navigate(`/searchImage/${searchTerm}/${null}`);
    } else if (format) {
      navigate(`/searchImage/${null}/${format}`);
    }
    setLoading(false);
  };
  return (
    <Container {...props}>
      <AreaSearch>
        <Select fontSize="16px" onChange={handleFormatChange} value={selectedFormat}>
          {visibleFormats.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </Select>
        <Divider />
        <InputWrapper>
          <Input
            type="text"
            fontSize="16px"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
            disabled={loading}
          />
          <ButtonSearch onClick={handleSearchClick} disabled={loading}>
            {loading ? 'Buscando...' : <CustomImg src={searchIcon} alt={altText} />}
          </ButtonSearch>
        </InputWrapper>
      </AreaSearch>
    </Container>
  );
};
