
import { render, screen, fireEvent, waitFor } from "@testing-library/react";import MusicPage from "../pages/MusicPage/Music";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { MemoryRouter } from "react-router-dom";

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
    getApp: jest.fn(),
    getApps: jest.fn(() => []), 
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
  }));
  
  jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(() => ({})),
  }));

// Mock de módulos externos com tipagem correta
jest.mock("firebase/storage", () => ({
    getStorage: jest.fn(() => ({
    })),
    ref: jest.fn(),
    getDownloadURL: jest.fn(
      () => Promise.resolve("http://mockurl.com/audio.mp3") 
    ),
  }));

jest.mock("../components/AudiosMusica/Musicas.tsx", () => [
  {
    id: "1",
    title: "Áudio 1",
    description: "Descrição do áudio 1",
    audioFilePath: "audio/1.mp3",
    imageFilePath: "images/1.jpg",
  },
  {
    id: "2",
    title: "Áudio 2",
    description: "Descrição do áudio 2",
    audioFilePath: "audio/2.mp3",
    imageFilePath: "images/2.jpg",
  },
]);

describe("MusicPage", () => {
  beforeEach(() => {
    (getDownloadURL as jest.Mock).mockResolvedValueOnce("http://example.com/image1.jpg");
    (getDownloadURL as jest.Mock).mockResolvedValueOnce("http://example.com/image2.jpg");
  });

  test("deve renderizar a página corretamente", () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    expect(screen.getByText(/Músicas e Sons Relaxantes/i)).toBeInTheDocument();

    expect(screen.getByAltText("Áudio 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição do áudio 1")).toBeInTheDocument();
    expect(screen.getByAltText("Áudio 2")).toBeInTheDocument();
    expect(screen.getByText("Descrição do áudio 2")).toBeInTheDocument();
  });

  test("deve carregar as imagens dos áudios corretamente", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    await waitFor(() => {
      const image1 = screen.getByAltText("Áudio 1") as HTMLImageElement;
      const image2 = screen.getByAltText("Áudio 2") as HTMLImageElement;

      expect(image1.src).toBe("http://example.com/image1.jpg");
      expect(image2.src).toBe("http://example.com/image2.jpg");
    });
  });

  /*/
  test("deve tocar o áudio quando o botão de play for clicado", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    
    const playButton = screen.getAllByRole("button")[0];
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(1);
    });
  });

  test("deve pausar o áudio quando o botão de pausa for clicado", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    const playButton = screen.getAllByRole("button")[0];
    fireEvent.click(playButton);

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();

    fireEvent.click(pauseButton);

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(1); 
    });
  });

  test("deve avançar o áudio quando o botão de skip for clicado", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    const playButton = screen.getAllByRole("button")[0];
    fireEvent.click(playButton);

    const skipButton = screen.getByRole("button", { name: /skip/i });
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(screen.getByText(/10:00/)).toBeInTheDocument(); 
    });
  });

  test("deve formatar o tempo corretamente", () => {
    const { container } = render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    const formattedTime = container.querySelector(".time-display");
    expect(formattedTime).toHaveTextContent("00:00");
  });
  /*/

  test("deve exibir corretamente os controles de navegação", () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    // Verificar os links de navegação
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Meditação")).toBeInTheDocument();
    expect(screen.getByText("Música")).toBeInTheDocument();
  });
});
