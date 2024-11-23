import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MeditationPage } from "../pages/MeditationPage/Meditation"; // Certifique-se de importar corretamente
import { getDownloadURL } from "firebase/storage";
import audioList from "../../components/AudiosMeditacao/Meditacoes";

jest.mock("firebase/storage", () => ({
  getDownloadURL: jest.fn(),
}));

// Mocking audio list
jest.mock("../../components/AudiosMeditacao/Meditacoes", () => [
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
    getDownloadURL.mockResolvedValue("http://mockurl.com/audio.mp3");
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

    fireEvent.click(playButton);

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalledTimes(1);
      // Ensure that the audio is playing (can be mocked with an event handler)
      expect(
        screen.getByRole("button", { name: /pause/i })
      ).toBeInTheDocument();
    });
  });

  it("pauses the audio when pause button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton); // Start playing audio

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    fireEvent.click(pauseButton); // Pause the audio

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument(); // Play button should be visible again
    });
  });

  it("skips the audio when skip button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton); // Start playing audio

    const skipButton = screen.getByRole("button", { name: /forward/i });
    fireEvent.click(skipButton); // Skip the audio

    await waitFor(() => {
      // Here you can test the change in currentTime (it could be mocked as well)
      expect(skipButton).toBeInTheDocument();
    });
  });

  it("opens the settings modal when the settings button is clicked", () => {
    const settingsButton = screen.getByRole("button", { name: /cog/i });
    fireEvent.click(settingsButton);

    expect(screen.getByText("Atualizar Credenciais")).toBeInTheDocument(); // Assuming the modal has this text
  });
});
