import React, { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import logo from "../../assets/logo2.png";
import {
  Container,
  Content,
  Header,
  Logo,
  NavBar,
  IconWrapper,
  Title,
  Highlights,
  SessionCard,
  PlayButton,
  PauseButton,
  ProgressSection,
  ProgressText,
  ProgressInfo,
  FooterNavBar,
  NavItem,
  NavIcon,
  Motivation,
  SessionImage,
  AudioControlWrapper,
  SettingsButton,
} from "./styles";
import { FaHome, FaMusic } from "react-icons/fa"; 
import { GiYinYang } from "react-icons/gi";
import { NavLink } from "react-router-dom"; 
import meditacao1 from "../../assets/meditacao1.jpg";
import meditacao2 from "../../assets/meditacao2.jpg";
import meditacao3 from "../../assets/meditacao3.jpg";
import musica1 from "../../assets/musica1.jpg";
import musica2 from "../../assets/musica2.jpg";
import musica3 from "../../assets/musica3.jpg";

const HomePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // Guardar o nome do arquivo tocando
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Guardar referência do áudio
  const [audioTimes, setAudioTimes] = useState<{ [key: string]: number }>({}); // Armazenar tempos independentes para cada áudio
  const [currentSession, setCurrentSession] = useState<string>("");

  const playAudio = async (audioFile: string) => {
    // Se já houver um áudio tocando e não for o mesmo, pausa o áudio atual
    if (audio && audio.src !== audioFile) {
      audio.pause();
      setIsPlaying(null);
      setAudioTimes((prevState) => ({ ...prevState, [audio.src]: audio.currentTime })); // Salva o tempo do áudio anterior
    }

    // Carregar o novo áudio
    const storage = getStorage();
    const audioRef = ref(storage, audioFile);

    try {
      const url = await getDownloadURL(audioRef);
      console.log("URL do áudio:", url);

      // Pausar o áudio atual, se houver, antes de carregar o novo áudio
      if (audio) {
        audio.pause();
      }

      const newAudio = new Audio(url);

      // Se houver um tempo salvo para esse áudio específico, inicie o áudio a partir deste ponto
      newAudio.currentTime = audioTimes[audioFile] || 0;

      newAudio.play().catch((error) => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("Não foi possível reproduzir o áudio.");
      });

      newAudio.onplay = () => {
        setIsPlaying(audioFile); // Atualiza o estado para o áudio que está tocando
      };

      newAudio.onpause = () => {
        setAudioTimes((prevState) => ({
          ...prevState,
          [audioFile]: newAudio.currentTime, // Salva o tempo atual quando o áudio é pausado
        }));
      };

      setAudio(newAudio); // Armazena a referência do novo áudio
      setCurrentSession(audioFile);

    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
      alert("Erro ao carregar o áudio.");
    }
  };
 

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(null); // Atualiza o estado para nenhum áudio tocando
      setAudioTimes((prevState) => ({
        ...prevState,
        [audio.src]: audio.currentTime, // Salva o tempo em que o áudio foi pausado
      }));
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <Logo src={logo} alt="Logo" />
          <NavBar>
            <SettingsButton>
              <IconWrapper uk-icon="icon: cog; ratio:1.5" />
            </SettingsButton>
          </NavBar>
        </Header>
        <Title>Bem-vindo à sua Jornada de Meditação</Title>

        <Motivation>
          <h3>Encontre Paz e Clareza Interior</h3>
          <p>
            Comece sua prática de meditação com áudios e sessões feitas para trazer equilíbrio
            e serenidade para sua vida. 
          </p>
        </Motivation>

        <Highlights>
          <h2>Destaques do Dia</h2>
          <div className="sessions">
            <SessionCard>
              <SessionImage src={meditacao1} alt="Meditação Inicial" />
              <h3>Meditação Inicial</h3>
              <p>Inicie sua jornada com uma meditação guiada para relaxamento profundo e foco.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/audio1.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/audio1.mp3")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={meditacao2} alt="Meditação Guiada" />
              <h3>Meditação Guiada</h3>
              <p>Mergulhe em uma jornada de autoconhecimento e relaxamento com nossa meditação guiada.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/audio2.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/audio2.mp3")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={meditacao3} alt="Meditação Avançada" />
              <h3>Meditação Avançada</h3>
              <p>Experimente técnicas de meditação mais profundas para maior clareza mental e paz interior.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/audio3.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/audio3.mp3")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>
          </div>

          <h2>Músicas Relaxantes</h2>
          <div className="music-sessions">
            <SessionCard>
              <SessionImage src={musica1} alt="Música Relaxante 1" />
              <h3>Música Relaxante 1</h3>
              <p>Desacelere e relaxe com músicas suaves que promovem tranquilidade e paz.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/musica1.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/musica1.mp3")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={musica2} alt="Música Relaxante 2" />
              <h3>Música Relaxante 2</h3>
              <p>Com melodias suaves, essa música cria o ambiente perfeito para relaxar e meditar.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/musica2.m4a" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/musica2.m4a")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={musica3} alt="Música Relaxante 3" />
              <h3>Música Relaxante 3</h3>
              <p>Permita-se relaxar e renovar suas energias com essa melodia suave que acalma a mente e o corpo.</p>
              <AudioControlWrapper>
                {isPlaying === "audios/musica3.m4a" ? (
                  <PauseButton onClick={pauseAudio}>Pausar</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audios/musica3.m4a")}>Começar agora</PlayButton>
                )}
              </AudioControlWrapper>
            </SessionCard>
          </div>
        </Highlights>

        <ProgressSection>
          <ProgressText>Seu Progresso</ProgressText>
          <ProgressInfo>
            <p>Você meditou por <strong>12 minutos</strong> esta semana!</p>
            <p><strong>5</strong> dias consecutivos de meditação!</p>
          </ProgressInfo>
        </ProgressSection>

        <FooterNavBar>
          <NavLink to="/home" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
            <NavItem>
              <NavIcon><FaHome /></NavIcon>
              <span>Home</span>
            </NavItem>
          </NavLink>

          <NavLink to="/meditacoes" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
            <NavItem>
              <NavIcon><GiYinYang /></NavIcon> 
              <span>Meditação</span>
            </NavItem>
          </NavLink>

          <NavLink to="/musicas" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
            <NavItem>
              <NavIcon><FaMusic /></NavIcon>
              <span>Música</span>
            </NavItem>
          </NavLink>
        </FooterNavBar>
      </Content>
    </Container>
  );
};

export default HomePage;
