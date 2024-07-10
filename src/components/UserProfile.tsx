import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import userServices from '../services/userServices';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { userId } = useParams<{ userId: string }>();
  const API_URL = "http://localhost:4000/users/"

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${API_URL}${userId}`);
          setUser(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };
    fetchUserData();
  }, [userId]);
  
  const handleRemoveFriend = async (friendId: string) => {

    if (!userId) {
      console.error('User ID is not defined');
      return;
    }

    console.log(`Removing friend with ID: ${friendId} from user with ID: ${userId}`);

    if (window.confirm('Are you sure you want to remove this friend?')) {
      try {
        await userServices.removeFriend(userId, friendId);
        setUser((prevUser: any) => ({
          ...prevUser,
          friends: prevUser.friends.filter((friend: any) => friend._id !== friendId),
        }));
      } catch (error) {
        console.error('Failed to remove friend', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      {user ? (
        <Box mt={4}>
          <Typography variant="h4">Welcome, {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h5" mt={4}>Friends List</Typography>
          {user.friends.length > 0 ? (
            <Box>
              {user.friends.map((friend: any) => (
                <Box key={friend._id} display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" style={{ flexGrow: 1 }}>
                    {friend.name}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveFriend(friend._id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No friends found</Typography>
          )}
        </Box>
      ) : (
        <Typography variant="h6" mt={4}>Loading...</Typography>
      )}
    </Container>
  );
};

export default UserProfile;
