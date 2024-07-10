import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavBar: React.FC = () => {

  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit" component={Link} to="/users">User List</Button>
        <Button color="inherit" component={Link} to="/" style={{ flexGrow: 1 }}>
          User Management
        </Button>
        {isAuthenticated && (
          <Button color="inherit" onClick={logout} style={{ marginLeft: 'auto' }}>Logout</Button>
        )}      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
