import { useMutation } from '@tanstack/react-query';
import AuthApi from '../api/authApi';
import { User } from '@prisma/client';
import { useState } from 'react';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: AuthApi.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: AuthApi.register,
  });
};

export const useLocalStorageUser = (): [
  User | null,
  (user: User | null) => void
] => {
  const initialUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(
    initialUser ? JSON.parse(initialUser) : null
  );

  const updateUser = (newUser: User | null) => {
    if (newUser === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    setUser(newUser);
  };

  return [user, updateUser];
};
