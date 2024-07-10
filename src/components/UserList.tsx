import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Card, CardActions, CardContent } from '@mui/material';
import userServices from '../services/userServices';
import { useAuth } from '../context/authContext';

interface IUser {
  _id: string;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userServices.list();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedUser(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await userServices.delete(selectedUser);
      setUsers(users.filter(user => user._id !== selectedUser));
      setSelectedUser(null);
      setOpen(false);
    }
  };

  const handleAddFriend = async (friendId: string) => {
    if (!userId) {
      alert('User not authenticated');
      return;
    }
    try {
      await userServices.addFriend(userId, friendId);
      alert('Friend added successfully');
    } catch (error) {
      alert('Failed to add friend');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h5" sx={{color: '#22487B'}} gutterBottom>User List</Typography>
        {users.map(user => (
          <Card key={user._id} variant="outlined" sx={{ mb: 2, boxShadow: 3, display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
              <Typography variant="body2" color="textSecondary">{user.email}</Typography>
            </CardContent>
            <CardActions sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
              {isAuthenticated && (
                <Button variant="contained" sx={{backgroundColor:'#062A62', mb: 1}} onClick={() => handleAddFriend(user._id)}>
                  Add Friend
                </Button>
              )}
              <Button variant="outlined" sx={{color:'#062A62'}} onClick={() => handleDeleteClick(user._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;