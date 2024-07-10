import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const API_URL = "http://localhost:4000/users/"

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}${userId}`);
        setUser(response.data);
        setFriends(response.data.friends);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <Container maxWidth="sm">
      {user ? (
        <Box mt={4}>
          <Typography variant="h4">Welcome, {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h5" mt={4}>Friends List</Typography>
          <List>
            {friends.map((friend) => (
              <ListItem key={friend._id}>
                <ListItemText primary={friend.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="h6" mt={4}>Loading...</Typography>
      )}
    </Container>
  );
};

export default UserProfile;
