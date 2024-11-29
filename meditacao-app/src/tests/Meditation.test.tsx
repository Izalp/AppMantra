import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getDownloadURL } from "firebase/storage";
import { MemoryRouter } from "react-router-dom";
import MeditationPage from "../pages/MeditationPage/Meditation";

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(),
  getDownloadURL: jest.fn(() =>
    Promise.resolve("http://mockurl.com/audio.mp3")
  ),
}));

jest.mock("../components/AudiosMeditacao/Meditacoes.tsx", () => [
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

describe("MeditationPage", () => {
  beforeEach(() => {
    (getDownloadURL as jest.Mock).mockResolvedValueOnce(
      "http://example.com/image1.jpg"
    );
    (getDownloadURL as jest.Mock).mockResolvedValueOnce(
      "http://example.com/image2.jpg"
    );
  });

  test("deve renderizar a página corretamente", () => {
    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Meditações/i)).toBeInTheDocument();
    expect(screen.getByAltText("Áudio 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição do áudio 1")).toBeInTheDocument();
    expect(screen.getByAltText("Áudio 2")).toBeInTheDocument();
    expect(screen.getByText("Descrição do áudio 2")).toBeInTheDocument();
  });

  test("deve tocar o áudio quando o botão de play for clicado", async () => {
    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    const playButton = screen.getAllByRole("button")[0];
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(3); 
    });
  });

  test("deve exibir corretamente os controles de navegação", () => {
    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Meditação")).toBeInTheDocument();
    expect(screen.getByText("Música")).toBeInTheDocument();
  });
});
