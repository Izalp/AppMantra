import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/Login";
import HomePage from "../pages/HomePage/Home";
import { signInWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Realiza login com sucesso", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "123" },
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const dashboardText = await screen.findByText(/Bem-vindo ao Home!/i);
    expect(dashboardText).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para e-mail inválido", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/invalid-credential",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Email inválido/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para campo de e-mail vazio", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Email é obrigatório/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para email inválido (formato inválido)", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email-format" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Email inválido/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para senha incorreta", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/invalid-credential",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));


    const errorMessage = await screen.findByText(/Email ou senha inválidos. Tente novamente!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para campo de senha vazio", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Senha é obrigatória/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro para senha menor que 6 caracteres", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/A senha deve conter pelo menos 6 caracteres/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro genérica para outros erros", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/unknown-error",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Ocorreu um erro, tente novamente mais tarde!/i);
    expect(errorMessage).toBeInTheDocument();
  });


  test("Exibe mensagem de erro para conta temporariamente desativada", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/too-many-requests",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(/Muitas tentativas de login. Tente redefinir sua senha ou tente novamente mais tarde./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Exibe mensagem de erro de conexão", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/network-request-failed",
    });
  
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "admin@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "senhateste" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
  
    const errorMessage = await screen.findByText(/Ocorreu um erro de conexão. Tente novamente mais tarde!/i);
    expect(errorMessage).toBeInTheDocument();
  });
  
  test("Alterna a visibilidade da senha", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    const passwordInput = screen.getByLabelText(/Senha/i);
    const passwordToggle = screen.getByTestId('toggle-password-visibility'); 
    
    expect(passwordInput).toHaveAttribute('type', 'password');
  
    fireEvent.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    fireEvent.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
});
