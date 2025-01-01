// src/components/Button.jsx
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  background-color: ${({ primary, theme }) => (primary ? theme.primary : theme.secondary)};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ primary, theme }) => (primary ? theme.primaryHover : theme.secondaryHover)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

const Button = ({ label, onClick, primary = false, disabled = false }) => {
  return (
    <ButtonContainer primary={primary} onClick={onClick} disabled={disabled}>
      {label}
    </ButtonContainer>
  );
};

export default Button;
