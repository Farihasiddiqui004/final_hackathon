import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:8080/api/users/signup', formData);
        alert('Signup successful!');
        navigate('/login');  // Redirect to login page after successful signup
      } catch (err) {
        alert('Signup failed!');
      }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Contact" name="contact" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Address" name="address" margin="normal" onChange={handleChange} />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
