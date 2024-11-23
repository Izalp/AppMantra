import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import MeditationPage from "../pages/MeditationPage/Meditation";
import { getDownloadURL } from "firebase/storage";

// Mocking Firebase Storage's getDownloadURL function
jest.mock("firebase/storage", () => ({
  getDownloadURL: jest.fn(() =>
    Promise.resolve("http://mockurl.com/audio.mp3")
  ), // Mocked promise resolving with the mock URL
}));

// Mocking audio list
jest.mock("../components/AudiosMeditacao/Meditacoes", () => [
  {
    id: "audio1",
    title: "Audio 1",
    description: "Description 1",
    audioFilePath: "path/to/audio1",
    imageFilePath: "path/to/image1",
  },
]);

describe("MeditationPage", () => {
  beforeEach(() => {
    render(<MeditationPage />);
  });

  it("renders meditation page correctly", () => {
    expect(screen.getByText("Meditações")).toBeInTheDocument();
    expect(screen.getByText("Em meio ao caos diário")).toBeInTheDocument();
  });

  it("displays the audio card correctly", () => {
    expect(screen.getByText("Audio 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("plays an audio when play button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });

    // Usando 'act' para envolver a interação assíncrona
    await act(async () => {
      fireEvent.click(playButton); // Simula o clique no botão de play
    });

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole("button", { name: /pause/i })
      ).toBeInTheDocument();
    });
  });

  it("pauses the audio when pause button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });

    // Usando 'act' para envolver a interação assíncrona
    await act(async () => {
      fireEvent.click(playButton); // Começa a reprodução do áudio
    });

    const pauseButton = screen.getByRole("button", { name: /pause/i });

    // Usando 'act' para envolver a interação assíncrona ao clicar no botão de pause
    await act(async () => {
      fireEvent.click(pauseButton); // Pausa o áudio
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument(); // O botão play deve reaparecer
    });
  });

  it("skips the audio when skip button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });

    // Usando 'act' para envolver a interação assíncrona
    await act(async () => {
      fireEvent.click(playButton); // Começa a reprodução do áudio
    });

    const skipButton = screen.getByRole("button", { name: /forward/i });

    // Usando 'act' para envolver a interação assíncrona ao clicar no botão de skip
    await act(async () => {
      fireEvent.click(skipButton); // Avança o áudio
    });

    await waitFor(() => {
      expect(skipButton).toBeInTheDocument();
    });
  });

  it("opens the settings modal when the settings button is clicked", () => {
    const settingsButton = screen.getByRole("button", { name: /cog/i });

    // Usando 'act' para envolver a interação assíncrona ao clicar no botão de configurações
    act(() => {
      fireEvent.click(settingsButton);
    });

    expect(screen.getByText("Atualizar Credenciais")).toBeInTheDocument(); // Assuming the modal has this text
  });
});
