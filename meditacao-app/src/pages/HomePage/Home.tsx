import React from "react";
import logo from "../../assets/logo2.png";
import {
  Container,
  Content,
  Title,
  Logo,
  NavBar,
  IconWrapper,
  Highlights,
  SessionButton,
  ProgressSection,
  ProgressText,
  ProgressInfo,
  FooterNavBar,
  NavItem,
  NavIcon
} from "./styles";

const HomePage: React.FC = () => {
  return (
    <Container>
      {/* Conteúdo principal */}
      <Content>
         {/* NavBar fixa no topo */}
      <NavBar>
        <Logo src={logo} alt="Logo" />
        <a href="#">
          <IconWrapper uk-icon="icon: cog; ratio:1.5"></IconWrapper>
        </a>
      </NavBar>
        <Title>Bem-vindo Usuário!</Title>

        <Highlights>
          <h2>Destaques do Dia</h2>
          <div>
            <SessionButton>
              <span>Meditação Inicial</span>
              <button>Começar agora</button>
            </SessionButton>

            <SessionButton>
              <span>Meditação Avançada</span>
              <button>Começar agora</button>
            </SessionButton>
          </div>

          <h3>Músicas Adicionadas</h3>
          <div>
            <SessionButton>
              <span>Música Relaxante 1</span>
              <button>Começar agora</button>
            </SessionButton>
            <SessionButton>
              <span>Música Relaxante 2</span>
              <button>Começar agora</button>
            </SessionButton>
          </div>
        </Highlights>

        <ProgressSection>
          <ProgressText>Progresso Pessoal</ProgressText>
          <ProgressInfo>
            <p>Você meditou por <strong>0 minutos</strong> esta semana!</p>
            <p>0 dias consecutivos meditando!</p>
          </ProgressInfo>
        </ProgressSection>

        {/* Barra de navegação inferior */}
      <FooterNavBar>
        <NavItem>
          <NavIcon>🏠</NavIcon>
          <span>Home</span>
        </NavItem>
        <NavItem>
          <NavIcon>🧘‍♀️</NavIcon>
          <span>Meditação</span>
        </NavItem>
        <NavItem>
          <NavIcon>🎵</NavIcon>
          <span>Música</span>
        </NavItem>
      </FooterNavBar>

      </Content>
    </Container>
  );
};

export default HomePage;
