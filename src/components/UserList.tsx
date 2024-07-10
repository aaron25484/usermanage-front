import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
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
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4">User List</Typography>
        <List>
          {users.map(user => (
            <ListItem key={user._id}>
            <ListItemText primary={user.name} secondary={user.email} />
            {isAuthenticated && (
              <Button variant="contained" color="primary" onClick={() => handleAddFriend(user._id)}>Add Friend</Button>
            )}
            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(user._id)}>Delete</Button>
          </ListItem>
          ))}
        </List>
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