import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import AddQuestion from './component/home/AddQuestion';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* Mostra la Navbar solo se il percorso non è "/login" o "/register" */}
      {location.pathname !== '/login' && location.pathname !== '/register'  && <Navbar />}

      
      <div className="content">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Navigate to="/FAQ" />} />
          <Route exact path='/FAQ' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/ticket' element={<AddQuestion />} />
        </Routes>
      </div>
      
      {/* Mostra il Footer solo se il percorso non è "/login" o "/register" */}
      {location.pathname !== '/login' && location.pathname !== '/register'  && <FooterComponent />}
    </div>
    
  );
}

// Il componente App deve essere avvolto da BrowserRouter
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
