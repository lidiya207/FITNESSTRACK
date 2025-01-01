import React from "react";
import styled from "styled-components";

// Styled component for input and textarea fields
const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.borderColor || "#ccc"};
  border-radius: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.input_bg || "#fff"};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#007aff"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder || "#999"};
  }
`;

const TextAreaField = styled.textarea`
  width: 90%;
  padding: 12px 20px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.borderColor || "#ccc"};
  border-radius: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.input_bg || "#fff"};
  transition: border-color 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#007aff"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder || "#999"};
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || "#666"};
  margin-bottom: 7px;
  margin-top: 10px;
  display: block;

`;

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  textArea = false,
  rows = 4,
}) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {textArea ? (
        <TextAreaField
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      ) : (
        <InputField
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default TextInput;
