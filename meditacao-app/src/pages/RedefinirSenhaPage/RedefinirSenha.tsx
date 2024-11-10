import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  
import { 
  Container, 
  LoginForm, 
  Logo, 
  InputWrapper, 
  Label, 
  Input, 
  Button, 
  ErrorMessage 
} from './styles';  
import logoImage from '../../assets/logo.png';  

const RedefinirSenhaPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth();  

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada.");
      setError("");
    } catch (error) {
      setError("Não foi possível enviar o e-mail. Verifique se o e-mail está correto.");
      setMessage("");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Logo src={logoImage} alt="Logo" />
        <h3>Esqueceu sua senha?</h3>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Insira seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
        </p>
        <InputWrapper>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        {message && <p style={{ color: "#4CAF50", fontSize: "12px", marginTop: "8px" }}>{message}</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Enviar</Button>
      </LoginForm>
    </Container>
  );
};

export default RedefinirSenhaPage;
