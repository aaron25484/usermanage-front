import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import userServices from '../services/userServices';

interface IUser {
  _id: string;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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
            <ListItem key={user._id} secondaryAction={
              <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(user._id)}>Delete</Button>
            }>
              <ListItemText primary={user.name} secondary={user.email} />
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