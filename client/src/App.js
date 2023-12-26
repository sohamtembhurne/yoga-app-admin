import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Home from './components/pages/Home';
import Receipt from './components/pages/Receipt';
import { MobileProvider } from './components/context/MobileContext';
import Toaster from './components/common/Toaster';
import DataGrid from './components/pages/DataGrid';

const App = () => {
  return (
    <BrowserRouter>
      <MobileProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/admin" element={<DataGrid />} />
        </Routes>
      </MobileProvider>
    </BrowserRouter>
  );
};

export default App;
