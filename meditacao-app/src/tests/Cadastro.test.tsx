import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CadastroPage from "../pages/CadastroPage/Cadastro";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

const mockNavigate = jest.fn();

describe("CadastroPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /*/
  test("Cadastro realizado com sucesso", async () => {
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

     jest.advanceTimersByTime(1000);

  expect(mockNavigate).toHaveBeenCalledWith('/');
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
  /*/

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

  test("Exibe erro para senha muito fraca", async () => {
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

  test("Alternando visibilidade da senha", async () => {
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
  });
});
