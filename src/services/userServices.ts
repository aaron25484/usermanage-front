import axios from 'axios';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const { VITE_API_URL } = import.meta.env

const register = async (user: IUser) => {
  const response = await axios.post(`${VITE_API_URL}/users`, user);
  console.log(response);
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axios.post(`${VITE_API_URL}/users/login`, { email, password });
  return response.data;
};

const list = async () => {
  const response = await axios.get(`${VITE_API_URL}/users`);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${VITE_API_URL}/users/${id}`);
  return response.data;
};

const addFriend = async (userId: string, friendId: string) => {
  const response = await axios.put(`${VITE_API_URL}/users/${userId}/friends/${friendId}`);
  return response.data;
};

const removeFriend = async (userId: string, friendId: string) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/users/${userId}/friends/${friendId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to remove friend:', error);
    throw error;
  }
};

const updateUser = async (id: string, newName: string) => {
  const response = await axios.put(`${VITE_API_URL}/users/${id}`, { name: newName });
  return response.data;
};

const userServices = {
  register,
  login,
  list,
  delete: deleteUser,
  addFriend,
  removeFriend,
  updateUser
};

export default userServices;
