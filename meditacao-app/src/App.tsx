import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/Home';
import CadastroPage from './pages/CadastroPage/Cadastro';
import MeditationPage from './pages/MeditationPage/Meditation';
import MusicPage from './pages/MusicPage/Music';
import RedefinirSenhaPage from './pages/RedefinirSenhaPage/RedefinirSenha';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/meditacoes" element={<MeditationPage />} />
      <Route path="/musicas" element={<MusicPage />} />
      <Route path="/redefinirsenha" element={<RedefinirSenhaPage/>} />
    </Routes>
  );
};

export default App;
