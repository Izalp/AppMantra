
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

// Mock dos dados dos áudios
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
    // Mock da função getDownloadURL retornando uma URL simulada
    (getDownloadURL as jest.Mock).mockResolvedValueOnce("http://example.com/image1.jpg");
    (getDownloadURL as jest.Mock).mockResolvedValueOnce("http://example.com/image2.jpg");
  });

  test("deve renderizar a página corretamente", () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    // Verificar se o título está renderizado
    expect(screen.getByText(/Músicas e Sons Relaxantes/i)).toBeInTheDocument();

    // Verificar se as imagens e descrições dos áudios estão presentes
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
      // Assegurando que o elemento é do tipo HTMLImageElement
      const image1 = screen.getByAltText("Áudio 1") as HTMLImageElement;
      const image2 = screen.getByAltText("Áudio 2") as HTMLImageElement;

      // Verificar se o src é o esperado
      expect(image1.src).toBe("http://example.com/image1.jpg");
      expect(image2.src).toBe("http://example.com/image2.jpg");
    });
  });

  test("deve tocar o áudio quando o botão de play for clicado", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    // Verificar se o botão de play é renderizado para o primeiro áudio
    const playButton = screen.getAllByRole("button")[0];
    expect(playButton).toBeInTheDocument();

    // Simular clique no botão de play
    fireEvent.click(playButton);

    // Verificar se o áudio está sendo tocado
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

    // Simular clique no botão de play para tocar o áudio
    const playButton = screen.getAllByRole("button")[0];
    fireEvent.click(playButton);

    // Verificar se o botão de pausa aparece
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();

    // Simular clique no botão de pausa
    fireEvent.click(pauseButton);

    // Verificar se o áudio foi pausado
    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(1); // Não deve recarregar o áudio
    });
  });

  test("deve avançar o áudio quando o botão de skip for clicado", async () => {
    render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    // Simular clique no botão de play para tocar o áudio
    const playButton = screen.getAllByRole("button")[0];
    fireEvent.click(playButton);

    // Simular clique no botão de skip
    const skipButton = screen.getByRole("button", { name: /skip/i });
    fireEvent.click(skipButton);

    // Esperar o progresso ser atualizado
    await waitFor(() => {
      expect(screen.getByText(/10:00/)).toBeInTheDocument(); // Verificando o progresso
    });
  });

  test("deve formatar o tempo corretamente", () => {
    const { container } = render(
        <MemoryRouter>
          <MusicPage />
        </MemoryRouter>
    );

    // Testar a formatação do tempo
    const formattedTime = container.querySelector(".time-display");
    expect(formattedTime).toHaveTextContent("00:00");
  });

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
