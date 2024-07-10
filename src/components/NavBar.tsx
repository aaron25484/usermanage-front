import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit" component={Link} to="/users">User List</Button>
        <Button color="inherit" component={Link} to="/" style={{ flexGrow: 1 }}>
          User Management
        </Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
