
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

interface CustomInputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
}) => {
  return (
    <Box mb={2}>
      <Typography variant="body1" mb={1}>
        {label} {required && <span style={{ color: 'red' }}>(*)</span>}
      </Typography>
      <TextField
        fullWidth
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        helperText={error && <Typography color="error">{helperText}</Typography>}
        variant="outlined"
        required={required}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
              borderColor: error ? 'red' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: error ? 'red' : '#999',
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? 'red' : '#1976d2',
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomInput;