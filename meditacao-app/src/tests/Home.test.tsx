import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/Home";

describe("HomePage", () => {
  test("deve renderizar o título principal corretamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/Bem-vindo à sua Jornada de Meditação/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("deve exibir as seções de destaques corretamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const highlightsTitle = screen.getByText(/Destaques do Dia/i);
    const musicTitle = screen.getByText(/Músicas Relaxantes/i);

    expect(highlightsTitle).toBeInTheDocument();
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
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const meditationButtons = screen.getAllByRole("button", { name: /Começar agora/i });

    // Verifica se os botões estão presentes
    expect(meditationButtons.length).toBeGreaterThan(0);

    // Simula o clique no primeiro botão
    fireEvent.click(meditationButtons[0]);

    // Certifique-se de que o teste verifica a navegação adequadamente
    // O `MemoryRouter` precisa ser configurado para simular o redirecionamento.
    expect(window.location.pathname).toBe("/meditacoes");
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

    const homeButton = screen.getByText(/Home/i);
    const meditationButton = screen.getByText(/Meditação/i);
    const musicButton = screen.getByText(/Música/i);

    expect(homeButton).toBeInTheDocument();
    expect(meditationButton).toBeInTheDocument();
    expect(musicButton).toBeInTheDocument();
  });

  test("deve abrir o modal de configurações ao clicar no botão de configurações", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const settingsButton = screen.getByRole("button", { name: /Configurações/i });
    fireEvent.click(settingsButton);

    // Verifica se o modal de configurações aparece após o clique
    const modalTitle = screen.getByText(/Configurações/i);
    expect(modalTitle).toBeInTheDocument();
  });
});
