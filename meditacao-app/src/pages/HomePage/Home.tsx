import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { NavLink, useNavigate } from "react-router-dom";
import { SettingsModal } from "../../components/Modal/Modal";
import { getAuth, signOut, deleteUser, updateEmail, updatePassword } from "firebase/auth";
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

import logo from "../../assets/logo2.png";
import meditacao1 from "../../assets/meditacao1.jpg";
import meditacao2 from "../../assets/meditacao2.jpg";
import meditacao3 from "../../assets/meditacao3.jpg";
import musica1 from "../../assets/musica1.jpg";
import musica2 from "../../assets/musica2.jpg";
import musica3 from "../../assets/musica3.jpg";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const storage = getStorage();
  const auth = getAuth();

  const [imageUrls, setImageUrls] = useState({
    meditacao1: meditacao1,
    meditacao2: meditacao2,
    meditacao3: meditacao3,
    musica1: musica1,
    musica2: musica2,
    musica3: musica3,
  });

  const [userProgress, setUserProgress] = useState({
    minutes: 0,
    consecutiveDays: 0,
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const urls = {
          meditacao1: await getDownloadURL(
            ref(storage, "images/meditacao1.jpg")
          ),
          meditacao2: await getDownloadURL(
            ref(storage, "images/meditacao2.jpg")
          ),
          meditacao3: await getDownloadURL(
            ref(storage, "images/meditacao3.jpg")
          ),
          musica1: await getDownloadURL(ref(storage, "images/musica1.jpg")),
          musica2: await getDownloadURL(ref(storage, "images/musica2.jpg")),
          musica3: await getDownloadURL(ref(storage, "images/musica3.jpg")),
        };
        setImageUrls(urls);
      } catch (error) {
        console.error(
          "Erro ao carregar imagens do Firebase. Usando imagens locais.",
          error
        );
      }
    };

    loadImages();

    const storedMinutes = parseInt(localStorage.getItem("minutes") || "0", 10);
    const storedConsecutiveDays = parseInt(
      localStorage.getItem("consecutiveDays") || "0",
      10
    );

    setUserProgress({
      minutes: storedMinutes,
      consecutiveDays: storedConsecutiveDays,
    });
  }, [storage]);

  function handleUpdate(email: string, password: string, isConfirmed: boolean): void {
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

  const handleMeditationCompletion = (minutesSpent: number) => {
    const updatedMinutes = userProgress.minutes + minutesSpent;
    const updatedDays = userProgress.consecutiveDays + 1; 

    setUserProgress({
      minutes: updatedMinutes,
      consecutiveDays: updatedDays,
    });

    localStorage.setItem("minutes", updatedMinutes.toString());
    localStorage.setItem("consecutiveDays", updatedDays.toString());
  };

  return (
    <Container>
      <Content>
        <Header>
          <Logo src={logo} alt="Logo" />
          <NavBar>
            <SettingsButton onClick={() => setIsModalOpen(true)}>
              <IconWrapper uk-icon="icon: cog; ratio:1.5" />
            </SettingsButton>
          </NavBar>
        </Header>
        <Title>Bem-vindo à sua Jornada de Meditação</Title>

        <Motivation>
          <h3>Encontre Paz e Clareza Interior</h3>
          <p>
            Comece sua prática de meditação com áudios e sessões feitas para
            trazer equilíbrio e serenidade para sua vida.
          </p>
        </Motivation>

        <Highlights>
          <h2>Destaques do Dia</h2>
          <div className="sessions">
            <SessionCard>
              <SessionImage
                src={imageUrls.meditacao1}
                alt="Meditação Inicial"
              />
              <h3>Meditação Inicial</h3>
              <p>
                Inicie sua jornada com uma meditação guiada para relaxamento
                profundo e foco.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/meditacoes")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={imageUrls.meditacao2} alt="Meditação Guiada" />
              <h3>Meditação Guiada</h3>
              <p>
                Mergulhe em uma jornada de autoconhecimento e relaxamento com
                nossa meditação guiada.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/meditacoes")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage
                src={imageUrls.meditacao3}
                alt="Meditação Avançada"
              />
              <h3>Meditação Avançada</h3>
              <p>
                Experimente técnicas de meditação mais profundas para maior
                clareza mental e paz interior.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/meditacoes")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>
          </div>

          <h2>Músicas Relaxantes</h2>
          <div className="music-sessions">
            <SessionCard>
              <SessionImage src={imageUrls.musica1} alt="Música Relaxante 1" />
              <h3>Música Relaxante 1</h3>
              <p>
                Desacelere e relaxe com músicas suaves que promovem
                tranquilidade e paz.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/musicas")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={imageUrls.musica2} alt="Música Relaxante 2" />
              <h3>Música Relaxante 2</h3>
              <p>
                Com melodias suaves, essa música cria o ambiente perfeito para
                relaxar e meditar.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/musicas")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>

            <SessionCard>
              <SessionImage src={imageUrls.musica3} alt="Música Relaxante 3" />
              <h3>Música Relaxante 3</h3>
              <p>
                Permita-se relaxar e renovar suas energias com essa melodia
                suave que acalma a mente e o corpo.
              </p>
              <AudioControlWrapper>
                <PlayButton onClick={() => navigate("/musicas")}>
                  Começar agora
                </PlayButton>
              </AudioControlWrapper>
            </SessionCard>
          </div>
        </Highlights>

        <ProgressSection>
          <ProgressText>Seu Progresso</ProgressText>
          <ProgressInfo>
            <p>
              Você meditou por <strong>{userProgress.minutes} minutos</strong> esta semana!
            </p>
            <p>
              <strong>{userProgress.consecutiveDays}</strong> dias consecutivos de meditação!
            </p>
          </ProgressInfo>
        </ProgressSection>

        <FooterNavBar modalOpen={isModalOpen}>
          <NavLink
            to="/home"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "active" : ""
            }
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
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "active" : ""
            }
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
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "active" : ""
            }
          >
            <NavItem>
              <NavIcon>
                <FaMusic />
              </NavIcon>
              <span>Música</span>
            </NavItem>
          </NavLink>
        </FooterNavBar>

        {isModalOpen && (
          <SettingsModal
            closeModal={() => setIsModalOpen(false)}
            onUpdate={handleUpdate}
            onDeleteAccount={handleDeleteAccount}
            onLogout={handleLogout}
          />
        )}
      </Content>
    </Container>
  );
};

export default HomePage;

