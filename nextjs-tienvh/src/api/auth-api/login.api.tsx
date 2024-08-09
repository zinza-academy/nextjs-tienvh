import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import axios from 'axios';
import { Gender, Role } from '@/components/common/enum';

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

interface UserInfo {
  id: number;
  cmt: string;
  email: string;
  name: string;
  dob: Date;
  gender: Gender;
  province_id: number;
  district_id: number;
  ward_id: number;
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

const fetchUserInfo = async (): Promise<UserInfo> => {
  try {
    const { data } = await api.get<{ data: UserInfo }>('/users/me', { withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error as ErrorResponse;
      throw new Error(errorResponse.response?.data?.message || 'Lấy thông tin người dùng thất bại');
    }
    throw error;
  }
};


const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      try {
        const userInfo = await fetchUserInfo();
        queryClient.setQueryData(['user'], userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
  });
};

export default useLogin;
