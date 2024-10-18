import styled from 'styled-components';

// Container principal com fundo cinza maior
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza o conteúdo verticalmente */
  align-items: center;
  min-height: 100vh; /* Garante que ocupe a altura total da tela */
  background-color: #f0f2f5;
  padding-top: 80px; /* Espaço para a NavBar fixa */
  padding-bottom: 80px; /* Espaço para a barra de navegação inferior */
`;


// Barra de navegação com logo e ícone no topo
export const NavBar = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100x;
  background-color: #fff;
`;

export const Logo = styled.img`
  width: 120px;
`;

export const IconWrapper = styled.span`
  color: #555;
  cursor: pointer;
`;

// Conteúdo principal
export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 20px;
  padding: 5px 30px 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
`;

// Título principal
export const Title = styled.h1`
  font-size: 23px;
  color: #333;
  margin-bottom: 22px;
  text-align: left;
  
`;

// Destaques e botões de sessões
export const Highlights = styled.section`

  h2 {
    font-size: 18px;
    color: #f08;
    margin-bottom: 10px;
    text-align: left;
    
  }
  
  h3 {
    font-size: 16px;
    color: #666;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: left;
  }
    
`;

export const SessionButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  
  
  span {
    font-size: 16px;
    color: #333;  }
  
  button {
    background-color: #f08;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
`;

// Progresso pessoal
export const ProgressSection = styled.section`
  text-align: left;
  margin-top: 20px;
  
`;

export const ProgressText = styled.h3`
  font-size: 18px;
  color: #f08;
  margin-bottom: 10px;
  text-align: left;
  

`;

export const ProgressInfo = styled.div`
  font-size: 14px;
  color: #666;
  padding-bottom: 22px; /* Espaço para a NavBar fixa */
  p {
    margin: 5px 0;
  }

  strong {
    font-weight: bold;
  }
    
`;


// Barra de navegação inferior
export const FooterNavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  max-width: 400px;
  background-color: #f7f7f7;
  padding: 1px;
  margin-bottom: 12px;
  border-radius: 12px;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;

  span {
    margin-top: 5px;
  }

  &:hover {
    color: #f08;
    cursor: pointer;
  }
`;

export const NavIcon = styled.div`
  font-size: 24px;
  color: #666;
`;