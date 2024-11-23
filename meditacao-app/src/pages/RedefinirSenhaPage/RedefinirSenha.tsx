import React, { useState } from "react";
import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from "firebase/auth";  
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

    if (!email) {
      setError("Preencha este campo");
      setMessage(""); 
      return;
    }

    const auth = getAuth();  

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        setError("Este e-mail não está registrado.");
        setMessage(""); 
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage("Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada.");
      setError(""); 
    } catch (error) {
      setError("Ocorreu um erro ao enviar o e-mail. Tente novamente.");
      setMessage(""); 
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage(""); 
    setError("");   
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
        <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange} 
            required
          />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <p style={{ color: "#4CAF50", fontSize: "12px", marginTop: "8px" }}>{message}</p>}
        <Button type="submit">Enviar</Button>
      </LoginForm>
    </Container>
  );
};

export default RedefinirSenhaPage;
