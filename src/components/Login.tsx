import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Logging in user with email:", email);
      const { user } = await userServices.login(email, password);
      setEmail('');
      setPassword('');
      console.log("Redirecting to profile with user ID:", user._id);
      navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error("Failed to login user:", error);
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
