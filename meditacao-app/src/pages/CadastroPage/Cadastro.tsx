import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SignupForm,
  Logo,
  InputWrapper,
  Label,
  Input,
  Button,
  ErrorMessage,
  IconWrapper,
  SignupPrompt,
  LoginLink,
  SuccessMessage,
} from "./styles";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface CadastroInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve conter pelo menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([Yup.ref("password")], "As senhas devem coincidir"),
});

const CadastroPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: CadastroInputs) => {
    setAuthError(null);
    setSuccessMessage(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        senha: data.password,
        createdAt: new Date(),
        updateAt: new Date(),
      });

      setSuccessMessage("Cadastro realizado com sucesso!"); 
      setTimeout(() => {
        navigate("/"); 
      }, 1000); 
    } catch (error: any) {
      handleSignupError(error);
    }
  };

  const handleSignupError = (error: any) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setAuthError("Este email já está em uso. Tente outro.");
        break;
      case "auth/invalid-email":
        setAuthError("Email inválido. Tente novamente.");
        break;
      case "auth/weak-password":
        setAuthError("A senha é muito fraca. Escolha uma senha mais forte.");
        break;
      default:
        setAuthError("Ocorreu um erro, tente novamente mais tarde!");
        break;
    }
  };

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <Logo src={logo} alt="Logo" />

        <InputWrapper>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Senha</Label>
          <InputWrapper style={{ position: "relative" }}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <IconWrapper
              onClick={() => setShowPassword(!showPassword)}
              data-testid="toggle-password-visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {authError && <ErrorMessage>{authError}</ErrorMessage>}
          </InputWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <InputWrapper style={{ position: "relative" }}>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <IconWrapper
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              data-testid="toggle-confirm-password-visibility"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
            {authError && <ErrorMessage>{authError}</ErrorMessage>}
          </InputWrapper>
        </InputWrapper>

        <Button type="submit">Cadastrar</Button>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <SignupPrompt>
          Já possui uma conta?{" "}
          <LoginLink onClick={() => navigate("/")}>Faça login</LoginLink>
        </SignupPrompt>
      </SignupForm>
    </Container>
  );
};

export default CadastroPage;

