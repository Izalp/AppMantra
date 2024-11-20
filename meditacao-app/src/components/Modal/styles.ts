import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);  
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  width: 85%;
  max-width: 450px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: slideIn 0.4s ease-out;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const ModalContent = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 25px;
    font-size: 26px;
    color: #333;
    font-weight: bold;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f35482;  
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 25px;  
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #e24c72;  
    transform: translateY(-3px);
  }

  &:active {
    background: #c83962;  
    transform: translateY(0);
  }

  svg {
    font-size: 20px;  
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
  background-color: #f35482;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d0436e;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #f35482;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
   color: #333;
  &:focus {
    outline: none;
    border-color: #f35482;
    box-shadow: 0 0 4px #efb8c8;
  }
`;

export const FormWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  text-align: left;
  margin-bottom: 5px;
`;
