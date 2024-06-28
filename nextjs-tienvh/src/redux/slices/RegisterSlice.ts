import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export interface RegisterCredentials {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
}

export const register = createAsyncThunk(
  'register/registerUser',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      return rejectWithValue('Đăng ký thất bại. Vui lòng thử lại.');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
