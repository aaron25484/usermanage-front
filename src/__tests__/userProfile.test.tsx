import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from '../components/UserProfile';
import userServices from '../services/userServices';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../services/userServices', () => ({
  profile: jest.fn(),
  removeFriend: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock('../context/authContext', () => ({
  useAuth: jest.fn(() => ({
    updateUserName: jest.fn(),
  })),
}));

describe('UserProfile', () => {
  const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    friends: [
      { _id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ],
  };

  beforeEach(() => {
    (userServices.profile as jest.Mock).mockResolvedValue(mockUser);
    jest.clearAllMocks();
  });

  test('renders user profile and friends list', async () => {
    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <Routes>
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Friends List')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('handles name editing', async () => {
    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <Routes>
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const editButton = screen.getAllByRole('button').find(button => 
      button.contains(screen.getByTestId('EditIcon'))
    );

    if (editButton) {
      fireEvent.click(editButton);
    }

    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'John Smith' } });

    const mockUpdatedUser = { ...mockUser, name: 'John Smith' };
    (userServices.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const saveButton = screen.getAllByRole('button').find(button => 
      button.contains(screen.getByTestId('SaveIcon'))
    );

    if (saveButton) {
      fireEvent.click(saveButton);
    }

    await waitFor(() => {
      expect(userServices.updateUser).toHaveBeenCalledWith('1', 'John Smith');
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });
  });

  test('handles friend removal', async () => {
    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <Routes>
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(userServices.removeFriend).toHaveBeenCalledWith('1', '2');
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  });
});
