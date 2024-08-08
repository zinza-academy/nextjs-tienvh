import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';
import { getUserFromToken } from '@/utils/decode-access-token';
import { Role } from '@/components/common/enum';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const useUserQuery = () => {
  return useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const user = getUserFromToken();
      if (user) {
        return user;
      } else {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
