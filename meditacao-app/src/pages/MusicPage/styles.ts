import styled from "styled-components";

interface ProgressBarProps {
  width: number;
}

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  color: #333;
  font-family: "Arial", sans-serif;

`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const Logo = styled.img`
  height: 80px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 10px;
`;

export const Motivation = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    line-height: 1;
    margin-bottom: 5px;
    padding: 0 15px;
  }

  p:last-child {
    font-weight: bold;
    color: #f35482;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export const AudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1000px;
  width: 100%;
  justify-items: center; // Cards centralizados na horizontal
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 10px;
  `;

export const AudioCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-bottom: 40px;
  min-height: 380px; // Mantém o mínimo de altura para os cards
  width: 300px; // Largura fixa para os cards
  display: flex;
  flex-direction: column; // Torna os itens dentro do card empilhados verticalmente
  justify-content: space-between; // Distribui o conteúdo ao longo do card

  &:hover {
    transform: translateY(-10px);
  }
`;

export const AudioImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  object-fit: contain;
  margin-bottom: 20px;
`;

export const AudioInfo = styled.div`
  display: "flex";
  justifycontent: "center";
  align-items: center;
  gap: "15px";
  margin-top: "20px";
  padding: 15px;
  text-align: center;
`;

export const AudioTitle = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const AudioDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 10px;
`;

export const ControlButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-bottom: 20px; // aumenta o espaço entre o botão e a barra de progresso

  &.play {
    color: #f35482; /* rosa */
  }

  &.pause {
    color: #e74c3c; /* vermelho */
  }

  &.skip {
    color: #f39c12; /* amarelo */
  }

  &:hover {
    transform: scale(1.2);
  }

  &.play:hover {
    color: #2ecc71; /* verde */
  }

  &.pause:hover {
    color: #c0392b; /* vermelho escuro */
  }

  &.skip:hover {
    color: #f1c40f; /* amarelo escuro */
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  max-width: 300px; 
  height: 7px;
  background-color: #ddd;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  background-color: #f35482; 
  border-radius: 10px;
  width: ${({ width }) => `${width}%`}; 
  transition: width 0.1s ease; 
  transform-origin: 100% 0%;
`;

export const TimeDisplay = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
  text-align: center;
  width: 40px;
  flex-shrink: 0;
`;

export const TimeDisplayContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
`;

export const FooterNavBar = styled.footer<{ modalOpen: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 10;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  ${(props) =>
    props.modalOpen &&
    `
      background-color: rgba(255, 255, 255, 0.8);
  `}
`;

export const NavItem = styled.div`
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    color: #f35482;
  }

  &.active {
    color: #f35482;
    svg {
      color: #f35482;
    }
  }

  span {
    font-size: 1rem;
    font-weight: bold;
    color: #34495e;
  }

  svg {
    font-size: 1.8rem;
    color: #34495e;
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: #f35482;
  }
`;

export const NavIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 5px;
`;
