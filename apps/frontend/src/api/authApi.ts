import axios from 'axios';
import { LoginRequest, RegisterRequest } from './types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/auth',
});

const login = async (request: LoginRequest) => {
  try {
    return await axiosInstance.post('login', request);
  } catch (error) {
    console.error('Error login user:', error);
  }
};

const register = async (request: RegisterRequest) => {
  try {
    return await axiosInstance.post('register', request);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

const AuthApi = {
  register,
  login,
};

export default AuthApi;
