import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavBar: React.FC = () => {

  const { isAuthenticated, logout, userId, userName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{backgroundColor: '#6FCBF5' }}>
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Button sx={{color: '#22487B'}} component={Link} to="/users">User List</Button>
        </Box>
        <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            style={{textDecoration: 'none', color: '#22487B', fontWeight:"bold", textAlign:"center" }}
          >
            User Management
          </Typography>
        </Box> 
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to={`/profile/${userId}`} sx={{color: '#22487B'}} style={{ marginLeft: 16 }}>
                Welcome, {userName}
              </Button>
              <Button color="inherit" onClick={handleLogout} sx={{color: '#22487B'}} style={{ marginLeft: 16 }}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
