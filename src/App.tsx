import React from 'react';
import RoutesComponent from './routes/routes';
import NavBar from './components/NavBar';
import './App.css'

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <RoutesComponent />
    </>
  );
};

export default App;
