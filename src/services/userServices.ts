import axios from 'axios';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const API_URL = 'http://localhost:4000/users';

const register = async (user: IUser) => {
  const response = await axios.post(`${API_URL}`, user);
  console.log(response);
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const list = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const addFriend = async (userId: string, friendId: string) => {
  const response = await axios.put(`${API_URL}/${userId}/friends/${friendId}`);
  return response.data;
};

const removeFriend = async (userId: string, friendId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}/friends/${friendId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to remove friend:', error);
    throw error;
  }
};

const updateUser = async (id: string, newName: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { name: newName });
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
