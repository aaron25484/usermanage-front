import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import userServices from '../services/userServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await userServices.register({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      alert('User registered successfully');
      login(newUser._id)
      navigate(`/profile/${newUser._id}`);
    } catch (error) {
      alert('Failed to register user');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
      Already have an account?
      <Button variant="text" color="secondary" href="/login">Login</Button>
    </Box>
  );
};

export default RegisterForm;
