import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MeditationPage from "./MeditationPage"; // Certifique-se de importar corretamente o componente
import { getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

jest.mock("firebase/storage", () => ({
  getDownloadURL: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("MeditationPage", () => {
  beforeEach(() => {
    getDownloadURL.mockResolvedValue("http://mockurl.com/audio.mp3");
  });

  it("renders meditation page correctly", async () => {
    render(<MeditationPage />);

    expect(screen.getByText("Meditações")).toBeInTheDocument();
    expect(screen.getByText("Em meio ao caos diário")).toBeInTheDocument();
  });

  it("plays an audio when play button is clicked", async () => {
    render(<MeditationPage />);

    // Mocking the audio play
    const audio = new Audio();
    audio.play = jest.fn();

    // Simulando o clique no botão de play
    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);

    // Verificando se o áudio foi iniciado
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  });

  it("pauses an audio when pause button is clicked", async () => {
    render(<MeditationPage />);

    // Mocking the audio pause
    const audio = new Audio();
    audio.pause = jest.fn();

    // Simulando o clique no botão de pause
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    fireEvent.click(pauseButton);

    // Verificando se o áudio foi pausado
    expect(audio.pause).toHaveBeenCalledTimes(1);
    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  });

  it("skips an audio when skip button is clicked", async () => {
    render(<MeditationPage />);

    // Mocking the audio skip functionality
    const audio = new Audio();
    audio.currentTime = 30; // Simulating a 30 seconds position
    audio.play = jest.fn();
    audio.pause = jest.fn();

    // Simulando o clique no botão de skip
    const skipButton = screen.getByRole("button", { name: /skip/i });
    fireEvent.click(skipButton);

    // Verificando se o áudio avançou corretamente
    expect(audio.currentTime).toBe(60); // Verificando se o tempo do áudio foi ajustado para 60 segundos
    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  });
});
