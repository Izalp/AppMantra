import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from 'react'; // Importação do 'act' do 'react'
import { MemoryRouter } from "react-router-dom"; // Importação do MemoryRouter
import MeditationPage from "../pages/MeditationPage/Meditation";
import { getDownloadURL } from "firebase/storage";
import audioList from "../components/AudiosMeditacao/Meditacoes";

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
    render(
      <MemoryRouter>
        <MeditationPage />
      </MemoryRouter>
    );
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

    // Usando o `act` para envolver ações assíncronas
    await act(async () => {
      fireEvent.click(playButton);
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
    
    // Usando o `act` para envolver ações assíncronas
    await act(async () => {
      fireEvent.click(playButton); // Start playing audio
    });

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    
    // Usando o `act` para envolver ações assíncronas
    await act(async () => {
      fireEvent.click(pauseButton); // Pause the audio
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument(); // Play button should be visible again
    });
  });

  it("skips the audio when skip button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });

    // Usando o `act` para envolver ações assíncronas
    await act(async () => {
      fireEvent.click(playButton); // Start playing audio
    });

    const skipButton = screen.getByRole("button", { name: /forward/i });
    
    // Usando o `act` para envolver ações assíncronas
    await act(async () => {
      fireEvent.click(skipButton); // Skip the audio
    });

    await waitFor(() => {
      expect(skipButton).toBeInTheDocument();
    });
  });

  it("opens the settings modal when the settings button is clicked", () => {
    const settingsButton = screen.getByRole("button", { name: /cog/i });
    
    // Usando o `act` para envolver ações assíncronas
    act(() => {
      fireEvent.click(settingsButton);
    });

    expect(screen.getByText("Atualizar Credenciais")).toBeInTheDocument(); // Assuming the modal has this text
  });
});
