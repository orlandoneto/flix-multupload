import React, { useState, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownToggle, DropdownMenu, DropdownMenuItem } from './styles';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Selecione uma opção',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={toggleDropdown}>{selectedOption || placeholder}</DropdownToggle>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownMenuItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
