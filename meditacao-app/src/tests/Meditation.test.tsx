import { render, screen, fireEvent } from "@testing-library/react";
import { MeditationPage } from "./MeditationPage"; // Certifique-se de importar corretamente
import { getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Certifique-se de importar

jest.mock("firebase/storage", () => ({
  getDownloadURL: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("MeditationPage", () => {
  it("renders meditation page correctly", async () => {
    getDownloadURL.mockResolvedValue("http://mockurl.com/audio.mp3");

    render(<MeditationPage />);

    expect(screen.getByText("Meditações")).toBeInTheDocument();
    expect(screen.getByText("Em meio ao caos diário")).toBeInTheDocument();
  });

  it("plays an audio when play button is clicked", async () => {
    const playButton = screen.getByRole("button", { name: /play/i });

    fireEvent.click(playButton);

    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  });

  it("pauses an audio when pause button is clicked", async () => {
    const pauseButton = screen.getByRole("button", { name: /pause/i });

    fireEvent.click(pauseButton);

    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  });
});
