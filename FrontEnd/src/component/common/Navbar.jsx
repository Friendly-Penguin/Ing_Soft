import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./Navbar.css";


function Navbar(){

    //Controllo se l'utente è autenticato e nel caso se sia un ADMIN
    // o un Utente normale
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () =>{
        const isLogout = window.confirm("Vuoi davvero uscire?");
        if(isLogout){
            ApiService.logout();
            navigate('/FAQ');
        }
    }


    return (
        <nav className="navbar">
          
          <div className="navObj">
            {/* Link all'home page tramite il logo */}
            <NavLink to="/FAQ" activeclassname="active">
              <img src="/assets/images/logo.png" alt="Logo"/>
            </NavLink>
          </div>
      
          <div className="navObj">
            {(isUser || !isAuthenticated) && <h1>FAQ</h1>}
            {isAdmin && <h1>ADMIN</h1>}
          </div>
          

          <div className="navObj">
            
              {!isAuthenticated && (
              <NavLink to="/login" activeclassname="active">Accedi</NavLink>
              )}

              <div className="last-section">
                {isUser && (
                  <NavLink to="/profile" activeclassname="active">Profilo</NavLink>
                )}

                {isAdmin && (
                  <NavLink to="/admin" activeclassname="active">Admin</NavLink>
                )}

                {isAuthenticated && 
                  <h1 className="logout" onClick={handleLogout}>Logout</h1>
                }

              </div>

          </div>

          </nav>
          
      );

}export default Navbar;