import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Container, LoginForm, Logo, InputWrapper, Label, Input, Button, ErrorMessage, IconWrapper, ForgotPassword, SignupPrompt, SignupLink } from './styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import logo from '../../assets/logo.png'; 
import { auth } from '../../firebase/config';  
import { signInWithEmailAndPassword as signIn } from 'firebase/auth'; 

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve conter pelo menos 6 caracteres'),
});

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    setAuthError(null);
    try {
      await signIn(auth, data.email, data.password);
      navigate('/home');
    } catch (error: any) {
      handleLoginError(error);
    }
  };
  
  const handleLoginError = (error: any) => {
    switch (error.code) {
      case "auth/invalid-credential":
        setAuthError('Email ou senha inválidos. Tente novamente!'); 
        break;
      case "auth/network-request-failed":
        setAuthError('Ocorreu um erro de conexão. Tente novamente mais tarde!'); 
        break;
      case "auth/too-many-requests":
        setAuthError('Muitas tentativas de login. Tente redefinir sua senha ou tente novamente mais tarde.'); 
        break;
      default:
        setAuthError('Ocorreu um erro, tente novamente mais tarde!'); 
        break;
    }
  };
  
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <Logo src={logo} alt="Logo" />

        <InputWrapper>
        <Label htmlFor="email">Email</Label> 
          <Input id="email" type="email" {...register('email')} /> 
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Senha</Label> 
          <InputWrapper style={{ position: 'relative' }}>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <IconWrapper onClick={() => setShowPassword(!showPassword)}
             data-testid="toggle-password-visibility">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          <ForgotPassword href="/redefinirsenha">Esqueceu a senha?</ForgotPassword>
        </InputWrapper>

        <Button type="submit">Entrar</Button>

        <SignupPrompt>
          Ainda não possui uma conta? <SignupLink href="/cadastro">Cadastre-se</SignupLink>
        </SignupPrompt>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;