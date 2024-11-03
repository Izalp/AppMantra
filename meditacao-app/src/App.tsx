import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/Home';
import CadastroPage from './pages/CadastroPage/Cadastro';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  );
};

export default App;
