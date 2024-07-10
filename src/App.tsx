import React from 'react';
import RoutesComponent from './routes/routes';
import NavBar from './components/NavBar';
import './App.css'
import { AuthProvider } from './context/authContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <RoutesComponent />
      </AuthProvider>
    </>
  );
};

export default App;
