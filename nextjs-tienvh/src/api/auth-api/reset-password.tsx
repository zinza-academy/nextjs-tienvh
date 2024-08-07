import { useMutation } from '@tanstack/react-query';
import api from '../api';

interface VariablesType {
  password: string;
  token: string;
}

interface ResetPasswordResponseType {
  message: string;
}

const resetPasswordApi = async (variables: VariablesType) => {
  const { data } = await api.post<ResetPasswordResponseType>(
    'auth/change-password',
    {
      token: variables.token,
      newPassword: variables.password, 
    }
  );
  return data;
};

const useResetPassword = () => {
  return useMutation<ResetPasswordResponseType, Error, VariablesType>({
    mutationFn: resetPasswordApi,
  });
};

export default useResetPassword;
