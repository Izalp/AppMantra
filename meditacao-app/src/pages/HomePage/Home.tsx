import React, { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
  PlayPauseButtonWrapper,
  PlayButton,
  PauseButton,
  ProgressSection,
  ProgressText,
  ProgressInfo,
  FooterNavBar,
  NavItem,
  NavIcon
} from "./styles";

const HomePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // Guardar o nome do arquivo tocando
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Guardar referência do áudio
  const [audioTimes, setAudioTimes] = useState<{ [key: string]: number }>({}); // Armazenar tempos independentes para cada áudio

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
        <NavBar>
          <Logo src={logo} alt="Logo" />
          <button onClick={() => console.log("Ação do ícone clicada")} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <IconWrapper uk-icon="icon: cog; ratio:1.5"></IconWrapper>
          </button>
        </NavBar>
        <Title>Bem-vindo Usuário!</Title>

        <Highlights>
          <h2>Destaques do Dia</h2>
          <div>
            <SessionButton>
              <span>Meditação Inicial</span>
              <PlayPauseButtonWrapper>
                {isPlaying === "audio1.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pause</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audio1.mp3")}>Começar agora</PlayButton>
                )}
              </PlayPauseButtonWrapper>
            </SessionButton>

            <SessionButton>
              <span>Meditação Avançada</span>
              <PlayPauseButtonWrapper>
                {isPlaying === "audio2.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pause</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audio2.mp3")}>Começar agora</PlayButton>
                )}
              </PlayPauseButtonWrapper>
            </SessionButton>
          </div>

          <h3>Músicas Adicionadas</h3>
          <div>
            <SessionButton>
              <span>Música Relaxante 1</span>
              <PlayPauseButtonWrapper>
                {isPlaying === "audio3.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pause</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audio3.mp3")}>Começar agora</PlayButton>
                )}
              </PlayPauseButtonWrapper>
            </SessionButton>
            <SessionButton>
              <span>Música Relaxante 2</span>
              <PlayPauseButtonWrapper>
                {isPlaying === "audio4.mp3" ? (
                  <PauseButton onClick={pauseAudio}>Pause</PauseButton>
                ) : (
                  <PlayButton onClick={() => playAudio("audio4.mp3")}>Começar agora</PlayButton>
                )}
              </PlayPauseButtonWrapper>
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
