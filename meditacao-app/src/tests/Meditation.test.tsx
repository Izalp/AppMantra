import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MeditationPage from "../pages/MeditationPage/Meditation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { email: "test@example.com" },
  })),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

describe("MeditationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve fazer login no Firebase e exibir o conteúdo corretamente", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { email: "test@example.com" },
    });

    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getAuth).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "usuario@exemplo.com",
        "senha123"
      );
    });

    const meditationTitle = screen.getByText(/Meditação Diária/i);
    expect(meditationTitle).toBeInTheDocument();
  });

  test("deve exibir um erro se o login no Firebase falhar", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao logar")
    );

    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const errorMessage = screen.getByText(/Não foi possível autenticar/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("deve carregar áudio corretamente do Firebase Storage", async () => {
    (getDownloadURL as jest.Mock).mockResolvedValueOnce(
      "https://example.com/audio.mp3"
    );

    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    const audioElement = await waitFor(() =>
      screen.getByTestId("audio-player")
    );
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute(
      "src",
      "https://example.com/audio.mp3"
    );
  });

  test("deve exibir uma mensagem de erro se o carregamento do áudio falhar", async () => {
    (getDownloadURL as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao carregar áudio")
    );

    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const errorMessage = screen.getByText(/Erro ao carregar o áudio/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
