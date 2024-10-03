import React from 'react';
import { Container, Content, Title, Logo } from './styles';
import logo from '../../assets/logo.png'; 

const HomePage: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo src={logo} alt="Logo" />
        <Title>Bem-vindo ao Home!</Title>
      </Content>
    </Container>
  );
};

export default HomePage;
