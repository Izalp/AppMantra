import React, { useState } from "react";
import { FaUserEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa"; 
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalContent, 
  MenuItem, 
  Title, 
  ActionButtonWrapper,
  ActionButton,
  InputField,
  Label,
  FormWrapper,
} from "./styles"; 

interface ModalProps {
  closeModal: () => void;
  onUpdate: (email: string, password: string, isConfirmed: boolean) => void;
  onDeleteAccount: (isConfirmed: boolean) => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<ModalProps> = ({
  closeModal,
  onUpdate,
  onDeleteAccount,
  onLogout,
}) => {
  const [currentStep, setCurrentStep] = useState<"menu" | "confirmDelete" | "update">("menu");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleDeleteConfirmation = () => {
    setCurrentStep("confirmDelete");
  };

  const handleConfirmDelete = () => {
    onDeleteAccount(true);
  };

  const handleUpdateClick = () => {
    setCurrentStep("update");
  };

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    onUpdate(email, password, true); 
    setCurrentStep("menu");  
  };

  const renderContent = () => {
    switch (currentStep) {
      case "menu":
        return (
          <>
            <h2>Configurações</h2>
            <Title>Escolha uma opção para gerenciar sua conta:</Title>
            <div className="menu">
              <MenuItem role="button" onClick={handleUpdateClick}>
                <FaUserEdit style={{ marginRight: "10px" }} /> Atualizar Cadastro
              </MenuItem>
              <MenuItem role="button" onClick={handleDeleteConfirmation}>
                <FaTrashAlt style={{ marginRight: "10px" }} /> Excluir Conta
              </MenuItem>
              <MenuItem role="button" onClick={onLogout}>
                <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
              </MenuItem>
            </div>
            <ActionButtonWrapper>
              <ActionButton onClick={closeModal}>Fechar menu</ActionButton> 
            </ActionButtonWrapper>
          </>
        );
      case "confirmDelete":
        return (
          <>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            <ActionButtonWrapper>
              <ActionButton onClick={handleConfirmDelete}>Excluir</ActionButton>
              <ActionButton onClick={() => setCurrentStep("menu")}>Cancelar</ActionButton>
            </ActionButtonWrapper>
          </>
        );
      case "update":
        return (
          <>
            <h2>Atualizar Cadastro</h2>
            <div className="form">
              <FormWrapper className="formWrapper">
                <Label className="label">Atualize seu E-mail:</Label>
                <InputField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Novo Email"
                />
              </FormWrapper>
              <FormWrapper className="formWrapper">
                <Label className="label">Atualize sua Senha:</Label>
                <InputField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nova Senha"
                />
              </FormWrapper>
              <FormWrapper className="formWrapper">
                <Label className="label">Confirmar Senha Nova:</Label>
                <InputField
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar Senha"
                />
              </FormWrapper>
            </div>
            <ActionButtonWrapper>
              <ActionButton onClick={handleUpdate}>Atualizar</ActionButton>
              <ActionButton onClick={() => setCurrentStep("menu")}>Voltar</ActionButton>
            </ActionButtonWrapper>
          </>
       );
      default:
        return null;
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          {renderContent()}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};
