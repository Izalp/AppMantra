import styled from 'styled-components';
import img1 from '../../assets/img1.jpg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${img1}); 
  background-size: cover; 
  background-position: center; 
`;

export const SignupForm = styled.form`
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
  margin: -30px 0 24px 0;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 7px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  color: #333;
  font-size: 20px;
  &:hover {
    color: #f35482;
  }
`;

export const Label = styled.label`
  font-size: 12px;
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

export const Button = styled.button`
  width: 40%;
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

export const SignupPrompt = styled.span`
  font-size: 12px; 
  color: #333; 
  text-align: left; 
  margin-top: 24px; 
  width: 100%; 
`;

export const LoginLink = styled.a`
  color: #333; 
  text-decoration: none;
  font-weight: bold; 
  text-align: left;

  &:hover {
    text-decoration: underline; 
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #d4edda; 
  color: #155724; 
  padding: 10px 20px; 
  border: 1px solid #c3e6cb; 
  border-radius: 5px; 
  z-index: 1000; 
  transition: opacity 0.5s ease; 
`;
