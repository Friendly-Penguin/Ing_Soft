import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import AddQuestion from './component/home/AddQuestion';
import Profile from './component/profile/Profile';
import AdminHome from './component/admin/Home/AdminHome';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import ApiService from './service/ApiService';

function App() {

  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const location = useLocation();
  return (
    
    <div className="App">
      
      {/* Mostra la Navbar solo se il percorso non è "/login" o "/register" */}
      {location.pathname !== '/login' && location.pathname !== '/register'  && <Navbar />}

      
      <div className="content">
        <Routes>

          {/* Se l'utente non è autenticato, reindirizza alla pagina FAQ */}
          {!isAuthenticated && (
              <Route path="/" element={<Navigate to="/FAQ" />} />
          )}

          {/* Se l'utente è autenticato ma NON è un admin, reindirizza alla pagina FAQ */}
          {isAuthenticated && !isAdmin && (
            <Route path="/" element={<Navigate to="/FAQ" />} />
          )}

          {/* Se l'utente è autenticato E è un admin, reindirizza alla pagina adminHome */}
          {isAuthenticated && isAdmin && (
            <Route path="/" element={<Navigate to="/adminHome" />} />
          )}
          
          <Route exact path='/FAQ' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />

          {/* AUTENTICATED USER ROUTES */}
          <Route exact path='/ticket' element={ <ProtectedRoute element={<AddQuestion/>} /> } />
          <Route exact path='/profile' element={ <ProtectedRoute element={<Profile/>} /> } />
        
          {/* ADMIN ROUTES */}
          <Route exact path='/adminHome' element={ <AdminRoute element={<AdminHome/>} /> } />
          
          
          
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
