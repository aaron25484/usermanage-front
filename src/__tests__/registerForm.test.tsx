import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import userServices from '../services/userServices';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/userServices', () => ({
  __esModule: true,
  default: {
    register: jest.fn() as jest.MockedFunction<typeof userServices.register>,
  },
}));

jest.mock('../context/authContext', () => ({
  useAuth: jest.fn(() => ({
    login: jest.fn(),
  })),
}));

describe('RegisterForm', () => {
  const originalAlert = window.alert;
  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    window.alert = originalAlert;
  });

  test('renders RegisterForm and handles form submission', async () => {
    (userServices.register as jest.Mock).mockResolvedValue({
      _id: '12345',
      name: 'John Doe'
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(userServices.register).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      expect(window.alert).toHaveBeenCalledWith('User registered successfully');
    });
  });

  test('handles registration error', async () => {
    (userServices.register as jest.Mock).mockRejectedValue(new Error('Failed to register'));

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(userServices.register).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      expect(window.alert).toHaveBeenCalledWith('Failed to register user');
    });
  });
});