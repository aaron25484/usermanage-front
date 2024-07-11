import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserList from '../components/UserList';
import userServices from '../services/userServices';
import { MemoryRouter } from 'react-router-dom';

// Mock de userServices
jest.mock('../services/userServices', () => ({
  list: jest.fn(),
  delete: jest.fn(),
  addFriend: jest.fn(),
}));

// Mock de useAuth
jest.mock('../context/authContext', () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
    userId: '1',
  })),
}));

describe('UserList', () => {
  const mockUsers = [
    { _id: '1', name: 'John Doe', email: 'john@example.com' },
    { _id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  ];

  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
    (userServices.list as jest.Mock).mockResolvedValue(mockUsers);
    (userServices.delete as jest.Mock).mockResolvedValue({});

    jest.clearAllMocks();
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  test('renders user list', async () => {
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User List')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  test('handles adding a friend', async () => {
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const addButton = screen.getAllByText('Add Friend')[0];
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(userServices.addFriend).toHaveBeenCalledWith('1', '1');
      expect(window.alert).toHaveBeenCalledWith('Friend added successfully');
    });
  });
});
