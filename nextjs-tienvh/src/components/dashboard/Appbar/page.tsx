import React, { useState } from 'react';
import { Box, Typography, MenuList, MenuItem, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Menu() {
  return (
    <MenuList sx={{ display: 'flex', flexDirection: 'row',gap: '4px' }}>
      <MenuItem component={Link} href="/">
        <Typography variant='body1'>
          Trang chủ
        </Typography>
      </MenuItem>
      <MenuItem component={Link} href="#">
        <Typography variant='body1'>
            Đăng ký tiêm
          </Typography>
      </MenuItem>
      <MenuItem component={Link} href="#" sx={{alignItems: 'center'}}>
        <Typography>
          Tra cứu
        </Typography>
        <ArrowDropDownIcon />
      </MenuItem>
      <MenuItem component={Link} href="#">
        <Typography>
          Tài liệu
          </Typography>
      </MenuItem>
      <MenuItem component={Link} href="/user/login">
        <Button 
          sx={{
            bgcolor:'#ffffff',
            color: '(theme)=> theme.palette.primary.dark',
            padding: '8px 22px',
            '&:hover': {
              bgcolor: '#f0f0f0', 
              opacity: 0.9,
            }
          }}>
            Đăng nhập</Button>
      </MenuItem>
    </MenuList>
  );
}

function AppBar() {

  return (
    <Box sx={{
      width: '100%',
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingY: '15px',
      paddingX: '36px',
      color: '#ffffff',
      overflowX: 'auto',
      background: 'var(--header-color)',
    }}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image 
          src="/img/Logo.png"
          alt="logo"
          width={42}
          height={50}
          style={{marginRight: '16px'}}
        />
        <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
          Cổng thông tin tiêm chủng covid-19
        </Typography>
      </Box>
      <Menu />
    </Box>
  );
}

export default AppBar;
