import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/Home";
import MeditationPage from "../pages/MeditationPage/Meditation";
import MusicPage from "../pages/MusicPage/Music";
import { SettingsModal } from "../components/Modal/Modal";
import { getDownloadURL } from "firebase/storage";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    deleteUser: jest.fn().mockResolvedValueOnce(undefined), 
    signOut: jest.fn().mockResolvedValueOnce(undefined),
    updateEmail: jest.fn().mockResolvedValueOnce(undefined),
    updatePassword: jest.fn().mockResolvedValueOnce(undefined),
  }))
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockDeleteUser = jest.fn();
const mockCloseModal = jest.fn();
const mockLogout = jest.fn();

global.console.error = jest.fn();

describe("HomePage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar o título principal corretamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(
      /Bem-vindo à sua Jornada de Meditação/i
    );
    expect(titleElement).toBeInTheDocument();
  });

  test("deve exibir as seções de destaques corretamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const highlightsTitle = screen.getByText(/Destaques do Dia/i);
    expect(highlightsTitle).toBeInTheDocument();

    const musicTitle = screen.getByText(/Músicas Relaxantes/i);
    expect(musicTitle).toBeInTheDocument();
  });

  test("deve exibir as informações de progresso do usuário", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const progressText = screen.getByText(/Seu Progresso/i);
    expect(progressText).toBeInTheDocument();

    const progressMinutes = screen.getByText(/Você meditou por/i);
    expect(progressMinutes).toBeInTheDocument();

    const progressDays = screen.getByText(/dias consecutivos de meditação!/i);
    expect(progressDays).toBeInTheDocument();
  });

  test("deve navegar para a página de meditações ao clicar no botão 'Começar agora'", () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meditacoes" element={<MeditationPage />} />
        </Routes>
      </MemoryRouter>
    );

    const meditationButtons = screen.getAllByRole("button", {
      name: /Começar agora/i,
    });

    expect(meditationButtons.length).toBeGreaterThan(0);
    fireEvent.click(meditationButtons[0]);
    expect(navigate).toHaveBeenCalledWith("/meditacoes");

    expect(meditationButtons.length).toBeGreaterThan(1);
    fireEvent.click(meditationButtons[1]);
    expect(navigate).toHaveBeenCalledWith("/meditacoes");

    expect(meditationButtons.length).toBeGreaterThan(2);
    fireEvent.click(meditationButtons[2]);
    expect(navigate).toHaveBeenCalledWith("/meditacoes");
  });

  test("deve navegar para a página de músicas ao clicar no botão 'Começar agora'", () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/musicas" element={<MusicPage />} />
        </Routes>
      </MemoryRouter>
    );

    const highlightsTitle = screen.getByText(/Músicas Relaxantes/i);
    expect(highlightsTitle).toBeInTheDocument();

    const meditationButtons = screen.getAllByRole("button", {
      name: /Começar agora/i,
    });

    expect(meditationButtons.length).toBeGreaterThan(3);
    fireEvent.click(meditationButtons[3]);
    expect(navigate).toHaveBeenCalledWith("/musicas");

    expect(meditationButtons.length).toBeGreaterThan(4);
    fireEvent.click(meditationButtons[4]);
    expect(navigate).toHaveBeenCalledWith("/musicas");

    expect(meditationButtons.length).toBeGreaterThan(5);
    fireEvent.click(meditationButtons[5]);
    expect(navigate).toHaveBeenCalledWith("/musicas");
  });

  test("deve carregar e exibir as imagens de meditação corretamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const meditationImage1 = screen.getByAltText("Meditação Inicial");
    const meditationImage2 = screen.getByAltText("Meditação Guiada");
    const meditationImage3 = screen.getByAltText("Meditação Avançada");

    expect(meditationImage1).toBeInTheDocument();
    expect(meditationImage2).toBeInTheDocument();
    expect(meditationImage3).toBeInTheDocument();
  });

  test("deve exibir corretamente os botões do rodapé de navegação", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole("link", { name: /Home/i });
    expect(homeButton).toBeInTheDocument();

    const meditationButton = screen.getByRole("link", { name: /Meditação/i });
    expect(meditationButton).toBeInTheDocument();

    const musicButton = screen.getByRole("link", { name: /Música/i });
    expect(musicButton).toBeInTheDocument();
  });

  test("deve abrir o modal de configurações ao clicar no botão de configurações", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const settingsButton = screen.getByRole("button", {
      name: /Configurações/i,
    });
    fireEvent.click(settingsButton);

    const modalTitle = screen.getByText(/Configurações/i);
    expect(modalTitle).toBeInTheDocument();
  });

  test("deve chamar deleteUser ao tentar excluir a conta", () => {
    render(
      <SettingsModal
        closeModal={jest.fn()}
        onUpdate={jest.fn()}
        onDeleteAccount={mockDeleteUser}
        onLogout={jest.fn()}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Excluir Conta/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByRole("button", { name: /Excluir/i, });
    expect(confirmDeleteButton).toBeInTheDocument();

    fireEvent.click(confirmDeleteButton);

    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
  });

  test("não deve chamar deleteUser ao tentar excluir a conta se não houver confirmação", () => {
    render(
      <SettingsModal
        closeModal={jest.fn()}
        onUpdate={jest.fn()}
        onDeleteAccount={mockDeleteUser}
        onLogout={jest.fn()}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Excluir Conta/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByRole("button", { name: /Cancelar/i, });
    expect(confirmDeleteButton).toBeInTheDocument();

    fireEvent.click(confirmDeleteButton);

    expect(mockDeleteUser).not.toHaveBeenCalled();
  });

  test("deve chamar o catch quando ocorrer um erro ao carregar as imagens", async () => {
    (getDownloadURL as jest.Mock).mockRejectedValueOnce(new Error("Erro ao carregar imagem"));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Erro ao carregar imagens do Firebase. Usando imagens locais.",
        expect.any(Error)
      );
    });
  });

  test("deve fechar o modal quando o botão de voltar for clicado", () => {
    render(
      <SettingsModal
        closeModal={mockCloseModal}
        onUpdate={jest.fn()}
        onDeleteAccount={jest.fn()}
        onLogout={jest.fn()}
      />
    );
  
    const voltarButton = screen.getByRole("button", { name: /Fechar menu/i });
    expect(voltarButton).toBeInTheDocument();
    fireEvent.click(voltarButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test("deve fechar o modal quando closeModal for chamado", () => {
    const setIsModalOpen = jest.fn();
    const closeModal = () => {
      setIsModalOpen(false);
    };

    closeModal();
    expect(setIsModalOpen).toHaveBeenCalledWith(false); 
  });

  test("deve realizar logout com sucesso", async () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);

    render(
      <SettingsModal
        closeModal={jest.fn()}
        onUpdate={jest.fn()}
        onDeleteAccount={jest.fn()}
        onLogout={mockLogout}
      />
    );

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
