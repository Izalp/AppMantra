import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './Login';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}));

describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('Exibe mensagem de erro para e-mail inválido', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
            code: 'auth/user-not-found',
        });

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'senhateste' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        const errorMessage = await screen.findByText(/email inválido/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('Exibe mensagem de erro para senha incorreta', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
            code: 'auth/wrong-password',
        });

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@email.com' } });
        fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        const errorMessage = await screen.findByText(/senha inválida/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
