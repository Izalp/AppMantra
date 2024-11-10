import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
  color: #333;
  font-family: 'Arial', sans-serif;
`;

export const Content = styled.div`
  padding: 30px;
  flex-grow: 1;
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

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.i`
  font-size: 1.5rem;
  color: #34495e;
`;

export const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  left: -30px; 
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 10px;
`;

export const Motivation = styled.section`
  text-align: center;
  margin-top: 30px;
  h3 {
    font-size: 1.8rem;
    color: #34495e;
  }
  p {
    font-size: 1.1rem;
    color: #7f8c8d;
  }
`;

export const Highlights = styled.section`
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    color: #2c3e50;
  }

  .sessions,
  .music-sessions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }
`;

export const SessionCard = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 20px); 
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-bottom: 20px;
  height: 430px;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 1024px) {
    width: calc(50% - 20px); 
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SessionImage = styled.img`
  width: 100%;
  height: auto; 
  max-height: 180px; 
  border-radius: 10px;
  object-fit: contain; 
  margin-bottom: 20px;
`;

export const SessionTitle = styled.h4`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const SessionDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 15px;
`;

export const PlayPauseButtonWrapper = styled.div`
  margin-top: 15px;
`;

export const PlayButton = styled.button`
  background-color: #f35482;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 60%; 

  &:hover {
    background-color: #2ecc71;
  }
`;

export const PauseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #c0392b;
  }
`;

export const ProgressSection = styled.section`
  margin-top: 60px;
  text-align: center;
`;

export const ProgressText = styled.h3`
  font-size: 1.8rem;
  color: #34495e;
`;

export const ProgressInfo = styled.div`
  font-size: 1.2rem;
  color: #34495e;
  margin-top: 10px;
`;

export const FooterNavBar = styled.footer`
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

export const AudioControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;
