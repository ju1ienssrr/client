import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
`;

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
