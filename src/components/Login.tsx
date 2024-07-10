import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';
import { useAuth } from '../context/authContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await userServices.login(email, password);
      setEmail('');
      setPassword('');
      login(user._id, user.name)
      navigate(`/profile/${user._id}`);
    } catch (error) {
      alert('Failed to login user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">Login</Typography>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;
