import { useMutation } from '@tanstack/react-query';
import api from '../api';

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordResponseType {
  token: string;
}

const forgotPasswordApi = async (
  forgotPasswordFormData: ForgotPasswordFormData
): Promise<ForgotPasswordResponseType> => {
  const { data } = await api.post<ForgotPasswordResponseType>(
    '/auth/forgot-password',
    forgotPasswordFormData
  );
  return data;
};

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
};

export default useForgotPassword;
