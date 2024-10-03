import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const LoginForm = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 150px; 
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  &:focus {
    outline: none;
    border-color: #f35482;
    box-shadow: 0 0 4px #efb8c8;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
  color: #333;
  font-size: 20px;
  &:hover {
    color: #f35482;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #f35482;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #efb8c8;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;