import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null, 
  isLoading: false,
  error: null, 
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  return new Promise<{ name: string; email: string }>((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'example', email: 'user@example.com' });
    }, 2000);
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<{ name: string; email: string }>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'No data user';
      });
  },
});

export default userSlice.reducer;
