import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import axios from 'axios';

interface LogoutResponseType {
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const logoutApi = async (): Promise<LogoutResponseType> => {
  try {
    const { data } = await api.post<LogoutResponseType>(
      '/auth/logout',
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error as ErrorResponse;
      throw new Error(errorResponse.response?.data?.message || 'Đăng xuất thất bại');
    }
    throw error;
  }
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export default useLogout;
