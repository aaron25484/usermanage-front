import React, { useState } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
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
      login(newUser._id, newUser.name)
      navigate(`/profile/${newUser._id}`);
    } catch (error) {
      alert('Failed to register user');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Card sx={{ maxWidth: 500, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{color: '#22487B'}} gutterBottom>
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Already have an account?
            </Typography>
            <Button
              variant="text"
              color="secondary"
              href="/login"
              sx={{ mt: 1 }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
