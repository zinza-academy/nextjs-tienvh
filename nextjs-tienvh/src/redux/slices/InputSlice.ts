import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {

  isSubmitting: boolean;
}

const initialState: InputState = {
  isSubmitting: false,
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const { setIsSubmitting } = inputSlice.actions;
export default inputSlice.reducer;