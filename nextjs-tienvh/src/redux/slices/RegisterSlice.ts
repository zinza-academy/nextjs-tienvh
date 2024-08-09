import { Gender } from '@/components/common/enum';
import { createSlice } from '@reduxjs/toolkit';

interface FormData {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: Gender;
  province_id: number;
  district_id: number;
  ward_id: number;
}

export type RegisterCredentials = FormData;
interface RegisterState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { setLoading, setError, setSuccess, clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
