import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavBar: React.FC = () => {

  const { isAuthenticated, logout, userId, userName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('NavBar - isAuthenticated:', isAuthenticated);
    console.log('NavBar - userId:', userId);
    console.log('NavBar - userName:', userName);
  }, [isAuthenticated, userId, userName]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit" component={Link} to="/users">User List</Button>
        <Button color="inherit" component={Link} to="/" style={{ flexGrow: 1 }}>
          User Management
        </Button>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to={`/profile/${userId}`} style={{ marginLeft: 'auto' }}>
              Welcome, {userName}
            </Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
