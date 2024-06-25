"use client";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setIsSubmitting } from '@/redux/slices/InputSlice';
export default function ForgotPasswordForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const { isSubmitting } = useSelector((state: RootState) => state.input);
    const router = useRouter();

    const isFormValid = email.trim() !== '';
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid || isSubmitting) return;
  
      dispatch(setIsSubmitting(true));
      setTimeout(() => {
        dispatch(setIsSubmitting(false));
        router.push('/user/login');
      }, 2000);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };


    return (
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
                <Typography sx={{ fontSize: '16px'}} mb={2}>
                    Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký <span style={{color: 'red'}}>(*)</span>
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    margin="normal"
                    
                />
                <Box sx={{display: 'flex', justifyContent: 'center'}} mt={2}>
                    <Stack spacing={2} direction="row" sx={{ width: '100%', maxWidth: '200px' }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push('/user/login')}
                            sx={{
                                flexGrow: 1,
                                minWidth: '100px',
                                color: '#303f9f',
                                borderColor: '#303f9f',
                                '&:hover': {
                                    opacity: '0.9'
                                },
                                borderRadius: '8px 8px 8px 0',
                            }}
                        >
                            QUAY LẠI
                        </Button>
                        <Button 
                            type="submit"
                            variant="contained"
                            disabled={!isFormValid || isSubmitting}
                            sx={{
                                flexGrow: 1,
                                minWidth: '100px',
                                backgroundColor: '#303f9f',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                    opacity: '0.9'
                                },
                                borderRadius: '8px 8px 8px 0',
                            }}
                        >
                            GỬI
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}