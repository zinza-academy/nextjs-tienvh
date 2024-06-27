import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/redux/slices/LoginSlice'
import userReducer from '../redux/slices/UserSlice';
import registerReducer from '../redux/slices/RegisterSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
