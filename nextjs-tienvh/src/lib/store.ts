import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/redux/slices/LoginSlice'
import userReducer from '../redux/slices/UserSlice';
export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
