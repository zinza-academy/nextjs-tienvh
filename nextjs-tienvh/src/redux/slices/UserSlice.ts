import api from '@/api/api';
import { Gender, Role } from '@/components/common/enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  cmt: string;
  email: string;
  name: string;
  dob: Date;
  gender: Gender;
  province_id: number;
  district_id: number;
  ward_id: number;
  role: Role;
}

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

const fetchUser = async (): Promise<User> => {
  const { data } = await api.get<{ data: User }>('/users/me', { withCredentials: true });
  return data.data;
};

export const useUserQuery = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
