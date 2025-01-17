import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import audioList from "../../components/AudiosMeditacao/Meditacoes";

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
  Title,
  Motivation,
  TimeDisplayContainer,
} from "./styles";

import logo from "../../assets/logo2.png";

import { FaPlay, FaPause, FaForward, FaHome, FaMusic } from "react-icons/fa";
import { GiYinYang } from "react-icons/gi";
import { NavLink,} from "react-router-dom";

const MeditationPage: React.FC = () => {
  const [isModalOpen, ] = useState(false);
  const [audioStates, setAudioStates] = useState<{
    [key: string]: {
      isPlaying: boolean;
      audio: HTMLAudioElement | null;
      currentTime: number;
      duration: number;
    };
  }>({});
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storage = getStorage();
    const loadImages = async () => {
      const urls: { [key: string]: string } = {};

      for (const audioItem of audioList) {
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
    const currentAudioState = audioStates[audioFilePath];

    if (currentAudioState && currentAudioState.isPlaying) {
      currentAudioState.audio?.pause();
      setAudioStates((prevState) => ({
        ...prevState,
        [audioFilePath]: {
          ...currentAudioState,
          isPlaying: false,
          currentTime: 0, 
        },
      }));
    } else {
      for (const key in audioStates) {
        if (audioStates[key].isPlaying && key !== audioFilePath) {
          audioStates[key].audio?.pause();
          setAudioStates((prevState) => ({
            ...prevState,
            [key]: { ...audioStates[key], isPlaying: false, currentTime: 0 }, 
          }));
        }
      }

      const storage = getStorage();
      const audioRef = ref(storage, audioFilePath);

      try {
        const url = await getDownloadURL(audioRef);
        const newAudio = new Audio(url);

        newAudio.currentTime = currentAudioState
          ? currentAudioState.currentTime
          : 0;

        newAudio.play().catch((error) => {
          console.error("Erro ao reproduzir o áudio:", error);
          alert("Não foi possível reproduzir o áudio.");
        });

        newAudio.oncanplaythrough = () => {
          setAudioStates((prevState) => ({
            ...prevState,
            [audioFilePath]: {
              isPlaying: true,
              audio: newAudio,
              currentTime: 0, 
              duration: newAudio.duration,
            },
          }));
        };

        newAudio.ontimeupdate = () => {
          setAudioStates((prevState) => ({
            ...prevState,
            [audioFilePath]: {
              ...prevState[audioFilePath],
              currentTime: newAudio.currentTime, 
            },
          }));
        };

        newAudio.onended = () => {
          setAudioStates((prevState) => ({
            ...prevState,
            [audioFilePath]: {
              ...prevState[audioFilePath],
              isPlaying: false, 
              currentTime: 0, 
            },
          }));
        };
      } catch (error) {
        console.error("Erro ao carregar o áudio:", error);
        alert("Erro ao carregar o áudio.");
      }
    }
  };

  const pauseAudio = (audioFilePath: string) => {
    const currentAudioState = audioStates[audioFilePath];
    if (currentAudioState) {
      currentAudioState.audio?.pause();
      setAudioStates((prevState) => ({
        ...prevState,
        [audioFilePath]: { ...currentAudioState, isPlaying: false },
      }));
    }
  };

  const skipAudio = (audioFilePath: string) => {
    const audioState = audioStates[audioFilePath];
    if (
      audioState &&
      audioState.audio &&
      audioState.audio.currentTime + 10 < audioState.audio.duration
    ) {
      audioState.audio.currentTime += 10;
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
      </Header>

      <Title>Meditações</Title>

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
        {audioList.map((audioItem) => {
          const currentAudioState = audioStates[audioItem.audioFilePath];
          return (
            <AudioCard key={audioItem.id}>
              <AudioImage src={imageUrls[audioItem.id]} alt={audioItem.title} />
              <AudioInfo>
                <h3>{audioItem.title}</h3>
                <p>{audioItem.description}</p>
              </AudioInfo>
              {currentAudioState?.isPlaying ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ControlButton
                    onClick={() => pauseAudio(audioItem.audioFilePath)}
                    className="pause"
                    aria-label="pause"
                  >
                    <FaPause size={24} />
                  </ControlButton>
                  <ControlButton
                    onClick={() => skipAudio(audioItem.audioFilePath)}
                    className="skip"
                    aria-label="skip"
                    style={{ marginLeft: "10px" }}
                  >
                    <FaForward size={24} />
                  </ControlButton>
                </div>
              ) : (
                <ControlButton
                  onClick={() => playAudio(audioItem.audioFilePath)}
                  className="play"
                  aria-label="play"
                >
                  <FaPlay size={24} />
                </ControlButton>
              )}

              <ProgressBarContainer>
                <ProgressBar
                  width={
                    ((currentAudioState?.currentTime || 0) /
                      (currentAudioState?.duration || 1)) *
                    100
                  }
                />
              </ProgressBarContainer>

              <TimeDisplayContainer>
                <TimeDisplay>
                  {formatTime(currentAudioState?.currentTime || 0)}
                </TimeDisplay>
                <TimeDisplay>
                  {formatTime(currentAudioState?.duration || 0)}
                </TimeDisplay>
              </TimeDisplayContainer>

              <audio data-testid={`audio-${audioItem.id}`} src={audioStates[audioItem.audioFilePath]?.audio?.src} />

            </AudioCard>
          );
        })}
      </AudioGrid>

      <FooterNavBar modalOpen={isModalOpen}>
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

export default MeditationPage;
