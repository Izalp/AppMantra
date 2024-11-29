import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CadastroPage from "../pages/CadastroPage/Cadastro";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("CadastroPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Cadastro realizado com sucesso", async () => {
    const createUserWithEmailAndPassword =
      require("firebase/auth").createUserWithEmailAndPassword;
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "test-user-id" },
    });

    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    expect(window.location.pathname).toBe("/");
  });

  test("Exibe mensagem de erro para e-mail já em uso", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/email-already-in-use",
    });

    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "emailusado@email.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessages = await screen.findAllByText(
      /Este email já está em uso. Tente outro./i
    );
    expect(errorMessages).toHaveLength(2);
  });

  test("Exibe erro para campo de email vazio", async () => {
    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessage = await screen.findByText(/Email é obrigatório/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para e-mail inválido (autenticação Firebase)", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/invalid-email",
    });

    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "email@dominio.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessages = await screen.findAllByText(
      /Email inválido. Tente novamente./i
    );
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test("Exibe mensagem de erro para senha fraca (auth/weak-password)", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/weak-password",
    });

    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "email@dominio.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "123456" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessages = await screen.findAllByText(
      /A senha é muito fraca. Escolha uma senha mais forte./i
    );
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test("Exibe erro para senha com menos de 6 caracteres", async () => {
    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "teste@email.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessage = await screen.findByText(
      /A senha deve conter pelo menos 6 caracteres/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe erro quando as senhas não coincidem", async () => {
    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "teste@email.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessage = await screen.findByText(/As senhas devem coincidir/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe erro genérico para falhas inesperadas", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/unknown-error",
    });

    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Usuário Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "teste@email.com" },
    });

    const senhaInputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(senhaInputs[0], { target: { value: "senha123" } });

    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    const errorMessages = await screen.findAllByText(
      /Ocorreu um erro, tente novamente mais tarde!/i
    );
    expect(errorMessages).toHaveLength(2);
  });

  test("Alterna a visibilidade das senha", async () => {
    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    const [passwordInput] = screen.getAllByLabelText(
      /Senha/i
    ) as HTMLInputElement[];
    expect(passwordInput.type).toBe("password");

    fireEvent.click(screen.getByTestId("toggle-password-visibility"));
    expect(passwordInput.type).toBe("text");

    fireEvent.click(screen.getByTestId("toggle-password-visibility"));
    expect(passwordInput.type).toBe("password");

    const confirmPasswordInput = screen.getByLabelText(
      /Confirmar Senha/i
    ) as HTMLInputElement;
    expect(confirmPasswordInput.type).toBe("password");

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(confirmPasswordInput.type).toBe("text");

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(confirmPasswordInput.type).toBe("password");

    expect(screen.getByTestId("toggle-password-visibility")).toContainHTML(
      '<svg class="fa-eye-slash"'
    );
    fireEvent.click(screen.getByTestId("toggle-password-visibility"));
    expect(screen.getByTestId("toggle-password-visibility")).toContainHTML(
      '<svg class="fa-eye"'
    );
    fireEvent.click(screen.getByTestId("toggle-password-visibility"));
    expect(screen.getByTestId("toggle-password-visibility")).toContainHTML(
      '<svg class="fa-eye-slash"'
    );
  });

  test("Alterna a visibilidade da senha de confirmação", async () => {
    render(
      <MemoryRouter>
        <CadastroPage />
      </MemoryRouter>
    );

    const confirmPasswordInput = screen.getByLabelText(
      /Confirmar Senha/i
    ) as HTMLInputElement;
    expect(confirmPasswordInput.type).toBe("password");

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(confirmPasswordInput.type).toBe("text");

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(confirmPasswordInput.type).toBe("password");

    expect(
      screen.getByTestId("toggle-confirm-password-visibility")
    ).toContainHTML('<svg class="fa-eye-slash"');
    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(
      screen.getByTestId("toggle-confirm-password-visibility")
    ).toContainHTML('<svg class="fa-eye"');
    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));
    expect(
      screen.getByTestId("toggle-confirm-password-visibility")
    ).toContainHTML('<svg class="fa-eye-slash"');
  });

  test("deve navegar para a página de login ao clicar no link 'Faça login'", async () => {
    render(
      <MemoryRouter initialEntries={["/cadastro"]}>
        <CadastroPage />
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/Faça login/i);
    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe("/");
  });
});
