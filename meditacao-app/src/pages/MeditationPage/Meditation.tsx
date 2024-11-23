import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import audioList from "../../components/AudiosMeditacao/Meditacoes";
import { SettingsModal } from "../../components/Modal/Modal";

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
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const MeditationPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioStates, setAudioStates] = useState<{
    [key: string]: {
      isPlaying: boolean;
      audio: HTMLAudioElement | null;
      currentTime: number;
      duration: number;
    };
  }>({});
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [, setUserConfirmed] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = getAuth();

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

  function handleUpdate(
    email: string,
    password: string,
    isConfirmed: boolean
  ): void {
    setUserConfirmed(isConfirmed);

    if (isConfirmed && auth.currentUser) {
      const promises = [];

      if (email) {
        promises.push(
          updateEmail(auth.currentUser, email).catch((error) =>
            console.error("Erro ao atualizar e-mail:", error)
          )
        );
      }

      if (password) {
        promises.push(
          updatePassword(auth.currentUser, password).catch((error) =>
            console.error("Erro ao atualizar senha:", error)
          )
        );
      }

      Promise.all(promises)
        .then(() => {
          console.log("E-mail e/ou senha atualizados com sucesso.");
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Erro ao atualizar credenciais:", error);
        });
    } else {
      console.error("Usuário não autenticado.");
    }
  }

  function handleDeleteAccount(isConfirmed: boolean): void {
    setUserConfirmed(isConfirmed);
    if (isConfirmed && auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => {
          console.log("Conta excluída com sucesso.");
          navigate("/");
        })
        .catch((error) => {
          console.error("Erro ao excluir conta:", error);
        });
    } else {
      console.log("Exclusão de conta cancelada.");
    }
  }

  function handleLogout(): void {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  }

  return (
    <PageContainer>
      <Header>
        <Logo src={logo} alt="Logo" />
        <NavBar>
          <SettingsButton onClick={() => setIsModalOpen(true)}>
            <IconWrapper uk-icon="icon: cog; ratio:1.5" />
          </SettingsButton>
        </NavBar>
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
        <p>Respire fundo e comece sua prática agora.</p>
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
                  >
                    <FaPause size={24} />
                  </ControlButton>
                  <ControlButton
                    onClick={() => skipAudio(audioItem.audioFilePath)}
                    className="skip"
                    style={{ marginLeft: "10px" }}
                  >
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
                <ProgressBar
                  value={
                    currentAudioState
                      ? (currentAudioState.currentTime /
                          currentAudioState.duration) *
                        100
                      : 0
                  }
                  max="100"
                />
                <TimeDisplayContainer>
                  <TimeDisplay>
                    {currentAudioState
                      ? formatTime(currentAudioState.currentTime)
                      : "00:00"}
                  </TimeDisplay>
                  <TimeDisplay>
                    {currentAudioState
                      ? formatTime(currentAudioState.duration)
                      : "00:00"}
                  </TimeDisplay>
                </TimeDisplayContainer>
              </ProgressBarContainer>
            </AudioCard>
          );
        })}
      </AudioGrid>

      <FooterNavBar>
        <NavItem>
          <NavLink to="/">
            <NavIcon>
              <FaHome size={24} />
            </NavIcon>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/music">
            <NavIcon>
              <FaMusic size={24} />
            </NavIcon>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/meditation">
            <NavIcon>
              <GiYinYang size={24} />
            </NavIcon>
          </NavLink>
        </NavItem>
      </FooterNavBar>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
        onDeleteAccount={handleDeleteAccount}
        onLogout={handleLogout}
      />
    </PageContainer>
  );
};

export default MeditationPage;
