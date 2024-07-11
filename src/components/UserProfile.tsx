import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import userServices from '../services/userServices';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await userServices.profile(userId);
          if (response) {
            setUser(response);
            setNewName(response.name);
          } else {
            console.error('No user data found');
          }
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

  const handleUpdateName = async () => {
    if (userId && newName.trim()) {
      try {
        const updatedUser = await userServices.updateUser(userId, newName);
        setUser(updatedUser);
        setEditingName(false);
      } catch (error) {
        console.error('Failed to update name', error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      {user ? (
        <Box mt={4}>
          <Card sx={{ mb: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                {editingName ? (
                  <TextField
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mr: 2 }}
                  />
                ) : (
                  <Typography variant="h5">
                    {user.name}
                  </Typography>
                )}
                {editingName ? (
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={handleUpdateName}
                    color="primary"
                  >
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={() => setEditingName(true)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h6" gutterBottom>
                {user.email}
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h5" mt={4} gutterBottom>
            Friends List
          </Typography>
          {user.friends.length > 0 ? (
            <Box>
              {user.friends.map((friend: any) => (
                <Card key={friend._id} sx={{ display: 'flex', mb: 2, boxShadow: 3 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {friend.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {friend.email}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      sx={{ color: '#062A62' }}
                      onClick={() => handleRemoveFriend(friend._id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>No friends found</Typography>
          )}
        </Box>
      ) : (
        <Typography variant="h6" mt={4}>
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default UserProfile;