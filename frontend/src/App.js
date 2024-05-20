import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Perfil from './Perfil';
import jwt_decode from 'jwt-decode';

function App() {
  // Verifica si existe un token JWT en el almacenamiento local al cargar la aplicación
  const token = localStorage.getItem('token');
  const isAuthenticated = token ? true : false;

  return (
    <Router>
      <Route path="/" exact>
        {isAuthenticated ? <Perfil /> : <Login />}
      </Route>
      <Route path="/perfil" component={Perfil} />
    </Router>
  );
}

export default App;
