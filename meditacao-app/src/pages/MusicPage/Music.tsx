import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  PageContainer,
  Header,
  AudioGrid,
  AudioCard,
  AudioImage,
  AudioInfo,
  ControlButton,
  FooterNavBar,
  NavItem,
  NavIcon,
  ProgressBar,
  ProgressBarContainer,
  TimeDisplay,
  Logo,
  SettingsButton,
  NavBar,
  IconWrapper,
  Title,
  Motivation,
  TimeDisplayContainer,
} from "./styles";
import logo from "../../assets/logo2.png";
import { FaPlay, FaPause, FaForward, FaHome, FaMusic } from "react-icons/fa";
import { GiYinYang } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import musicaList from "../../components/AudiosMusica/Musicas";


const MusicPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioTimes, setAudioTimes] = useState<{ [key: string]: number }>({});
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const storage = getStorage();
    const loadImages = async () => {
      const urls: { [key: string]: string } = {};

      for (const audioItem of musicaList) {
        try {
          const imageRef = ref(storage, audioItem.imageFilePath);
          const url = await getDownloadURL(imageRef);
          urls[audioItem.id] = url;
        } catch (error) {
          console.error(
            `Erro ao carregar a imagem para ${audioItem.id}:`,
            error
          );
        }
      }

      setImageUrls(urls);
    };

    loadImages();
  }, []);

  const playAudio = async (audioFilePath: string) => {
    if (audio && audio.src !== audioFilePath) {
      audio.pause();
      setIsPlaying(null);
      setAudioTimes((prevState) => ({
        ...prevState,
        [audio.src]: audio.currentTime,
      }));
    }

    const storage = getStorage();
    const audioRef = ref(storage, audioFilePath);

    try {
      const url = await getDownloadURL(audioRef);
      console.log("URL do áudio:", url);

      if (audio) {
        audio.pause();
      }

      const newAudio = new Audio(url);
      newAudio.currentTime = audioTimes[audioFilePath] || 0;

      newAudio.play().catch((error) => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("Não foi possível reproduzir o áudio.");
      });

      newAudio.oncanplaythrough = () => {
        setIsPlaying(audioFilePath);
        setDuration(newAudio.duration); 
        console.log("Duração do áudio:", newAudio.duration); 
      };

      newAudio.ontimeupdate = () => {
        setCurrentTime(newAudio.currentTime); // Atualiza o tempo atual
      };

      newAudio.onpause = () => {
        setAudioTimes((prevState) => ({
          ...prevState,
          [audioFilePath]: newAudio.currentTime,
        }));
      };

      newAudio.onended = () => {
        setIsPlaying(null);  // Permite que o áudio seja reiniciado ao clicar novamente
      };

      setAudio(newAudio);
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
      alert("Erro ao carregar o áudio.");
    }
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(null);
      setAudioTimes((prevState) => ({
        ...prevState,
        [audio.src]: audio.currentTime,
      }));
    }
  };

  const skipAudio = () => {
    if (audio && audio.currentTime + 10 < audio.duration) {
      audio.currentTime += 10;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"; 
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <PageContainer>
      <Header>
        <Logo src={logo} alt="Logo" />
        <NavBar>
          <SettingsButton>
            <IconWrapper uk-icon="icon: cog; ratio:1.5" />
          </SettingsButton>
        </NavBar>
      </Header>

      <Title>Músicas e Sons Relaxantes</Title>

      <Motivation>
        <p>
          Em meio ao caos diário, é fácil se perder em pensamentos acelerados e
          preocupações.
        </p>
        <p>
          A meditação oferece uma pausa, onde você pode se reconectar com sua
          essência.
        </p>
        <p>
          Experimente nossos áudios e relaxe em sessões criadas para ajudar você
          a alcançar um estado de paz e clareza.
        </p>
        <p>
          Não importa onde você esteja na sua jornada, a meditação está sempre
          aqui para guiá-lo de volta ao momento presente.
        </p>
        <p>Respire fundo e comece sua praticando agora</p>
      </Motivation>

      <AudioGrid>
        {musicaList.map((audioItem) => (
          <AudioCard key={audioItem.id}>
            <AudioImage src={imageUrls[audioItem.id]} alt={audioItem.title} />
            <AudioInfo>
              <h3>{audioItem.title}</h3>
              <p>{audioItem.description}</p>
            </AudioInfo>
              {isPlaying === audioItem.audioFilePath ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ControlButton onClick={pauseAudio} className="pause">
                    <FaPause size={24} />
                  </ControlButton>
                  <ControlButton onClick={skipAudio} className="skip" style={{ marginLeft: '10px' }}>
                    <FaForward size={24} />
                  </ControlButton>
                </div>
              ) : (
                <ControlButton
                  onClick={() => playAudio(audioItem.audioFilePath)}
                  className="play"
                >
                  <FaPlay size={24} />
                </ControlButton>
              )}

            <ProgressBarContainer>
              <ProgressBar width={(currentTime / duration) * 100 } />
            </ProgressBarContainer>

            <TimeDisplayContainer>
                  <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
                  <TimeDisplay>{formatTime(duration)}</TimeDisplay> 
            </TimeDisplayContainer>
          </AudioCard>
        ))}
      </AudioGrid>

      <FooterNavBar>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <NavItem>
            <NavIcon>
              <FaHome />
            </NavIcon>
            <span>Home</span>
          </NavItem>
        </NavLink>

        <NavLink
          to="/meditacoes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <NavItem>
            <NavIcon>
              <GiYinYang />
            </NavIcon>
            <span>Meditação</span>
          </NavItem>
        </NavLink>

        <NavLink
          to="/musicas"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <NavItem>
            <NavIcon>
              <FaMusic />
            </NavIcon>
            <span>Música</span>
          </NavItem>
        </NavLink>
      </FooterNavBar>
    </PageContainer>
  );
};

export default MusicPage;
