import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginState {
  isLoading: boolean;
  token: string | null;
  error: string | null;
}

const initialState: LoginState = {
  isLoading: false,
  token: null,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Fake API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fake user
      const fakeUser = { email: "user@example.com", password: "12345678" };
      
      if (credentials.email === fakeUser.email && credentials.password === fakeUser.password) {
        const token = "fake_jwt_token_1";
        localStorage.setItem('token', token);
        return { token };
      } else {
        return rejectWithValue("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi đăng nhập");
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearToken } = loginSlice.actions;
export default loginSlice.reducer;
