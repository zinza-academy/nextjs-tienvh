import { useMutation } from '@tanstack/react-query';
import api from '../api';
import axios from 'axios';
import { Gender } from '@/components/common/enum';

export interface RegisterFormData {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: Date;
  gender: Gender;
  province_id: number;
  district_id: number;
  ward_id: number;
}

interface RegisterResponseType {
  data: RegisterFormData | null;
  message: string;
  statusCode: number;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const RegisterApi = async (
  RegisterFormData: RegisterFormData
): Promise<RegisterResponseType> => {
  try {
    const { data } = await api.post<RegisterResponseType>(
      '/auth/register',
      RegisterFormData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error as ErrorResponse;
      throw new Error(errorResponse.response?.data?.message || 'Đăng ký thất bại');
    }
    throw error;
  }
};

const useRegister = () => {
  return useMutation({
    mutationFn: RegisterApi,
  });
};

export default useRegister;
