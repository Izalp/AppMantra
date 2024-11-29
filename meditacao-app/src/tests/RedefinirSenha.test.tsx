import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RedefinirSenhaPage from "../pages/RedefinirSenhaPage/RedefinirSenha";
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  fetchSignInMethodsForEmail: jest.fn(),
}));

describe("RedefinirSenhaPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza a página com todos os elementos", () => {
    render(<RedefinirSenhaPage />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText(/Esqueceu sua senha\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  test("submete o formulário com sucesso com um e-mail válido", async () => {
    const emailValido = "test@example.com";

    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValueOnce(["password"]);
    (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce({});

    render(<RedefinirSenhaPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: emailValido } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => expect(screen.getByText(/Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada./i)).toBeInTheDocument());
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), emailValido);
  });

  test("exibe mensagem de erro quando o email é inválido", async () => {
    const emailInvalido = "email-invalido";

    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValueOnce([]);
    (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(new Error("Email inválido"));

    render(<RedefinirSenhaPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: emailInvalido } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => expect(screen.getByText(/Este e-mail não está registrado./i)).toBeInTheDocument());
  });

  test("não exibe mensagem de sucesso inicialmente", () => {
    render(<RedefinirSenhaPage />);

    expect(screen.queryByText(/Um e-mail para redefinição de senha foi enviado/i)).not.toBeInTheDocument();
  });

  test("limpa a mensagem de sucesso quando o e-mail é alterado", async () => {
    const emailValido = "test@example.com";

    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValueOnce(["password"]);
    (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce({});

    render(<RedefinirSenhaPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: emailValido } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => expect(screen.getByText(/Um e-mail para redefinição de senha foi enviado./i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "" } });

    expect(screen.queryByText(/Um e-mail para redefinição de senha foi enviado/i)).not.toBeInTheDocument();
  });

  test("exibe mensagem de erro quando o e-mail está vazio e o botão de envio é clicado", async () => {
    render(<RedefinirSenhaPage />);
  
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
  
    const errorMessages = await screen.findAllByText(/Preencha este campo/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test("exibe mensagem de erro quando ocorre um erro ao enviar o e-mail", async () => {
    const emailValido = "test@example.com";
   
    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValueOnce(["password"]);
    (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(new Error("Erro ao enviar o e-mail"));
  
    render(<RedefinirSenhaPage />);
  
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: emailValido } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => expect(screen.getByText(/Ocorreu um erro ao enviar o e-mail. Tente novamente./i)).toBeInTheDocument());

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), emailValido);
  });
});
