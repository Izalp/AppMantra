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
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string().min(6, 'A senha deve conter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const LoginPage: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await signIn(auth, data.email, data.password);
      navigate('/home'); 
    } catch (error: any) { 
      console.error("Erro no login: ", error);
      if (error.code === 'auth/user-not-found') {
        setError('email', { type: 'manual', message: 'Email inválido' });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { type: 'manual', message: 'Senha inválida' });
      } else {
        setError('email', { type: 'manual', message: 'Email inválido' });
        setError('password', { type: 'manual', message: 'Senha inválida' });
      }
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
            <IconWrapper onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <ForgotPassword href="/reset-password">Esqueceu a senha?</ForgotPassword>
        </InputWrapper>
        <Button type="submit">Entrar</Button>
        <SignupPrompt>
          Ainda não possui uma conta? <SignupLink href="/signup">Cadastre-se</SignupLink>
        </SignupPrompt>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
