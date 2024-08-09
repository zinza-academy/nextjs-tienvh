import { useMutation } from '@tanstack/react-query';
import api from '../api';
import axios from 'axios';

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponseType {
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const loginApi = async (
  loginFormData: LoginFormData
): Promise<LoginResponseType> => {
  try {
    const { data } = await api.post<LoginResponseType>(
      '/auth/login',
      loginFormData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error as ErrorResponse;
      throw new Error(errorResponse.response?.data?.message || 'Đăng nhập thất bại');
    }
    throw error;
  }
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export default useLogin;
