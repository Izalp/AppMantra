import React from "react";
import { FaTimes, FaUserEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa"; 
import { ModalOverlay, ModalContainer, ModalContent, CloseButton, MenuItem, Title } from "./styles"; 

interface ModalProps {
  closeModal: () => void;
  onUpdate: () => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<ModalProps> = ({
  closeModal,
  onUpdate,
  onDeleteAccount,
  onLogout
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={closeModal}>
            <FaTimes />
          </CloseButton>
          <h2>Configurações</h2>
          <Title>Escolha uma opção para gerenciar sua conta:</Title>
          <div className="menu">
            <MenuItem onClick={onUpdate}>
              <FaUserEdit style={{ marginRight: "10px" }} /> Atualizar Cadastro
            </MenuItem>
            <MenuItem onClick={onDeleteAccount}>
              <FaTrashAlt style={{ marginRight: "10px" }} /> Excluir Conta
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
            </MenuItem>
          </div>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};
