import React from 'react';
import { Outlet } from 'react-router-dom';

const IniciarSesion = () => {
  return (
    <div>
      Desde IniciarSesion.jsx
      <Outlet />
    </div>
  );
};

export default IniciarSesion;
