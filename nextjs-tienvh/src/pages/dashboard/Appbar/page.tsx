import useLogout from '@/api/auth-api/logout.api';
import { getRoleString } from '@/components/common/enum';
import { useUserQuery } from '@/redux/slices/UserSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EastIcon from '@mui/icons-material/East';
import GroupIcon from '@mui/icons-material/Group';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  MenuList,
  Menu as MenuMaterial,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function Menu() {
  const { data: user, isLoading, error } = useUserQuery();
  console.log(user);
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      window.location.reload();
      handleUserMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUserInfoClose = () => {
    setShowUserInfo(false);
    setUserMenuAnchorEl(null); 
  };

  const handleUserInfoClick = () => {
    setShowUserInfo(true);
    setUserMenuAnchorEl(null);
  };

  const renderUserMenu = () => {
    if (isLoading) {
      return <CircularProgress size={24} />;
    }

    if (user) {
      return (
        [
          <MenuItem key="userMenu" onClick={handleUserMenuClick}>
            <Typography>{user.name}</Typography>
            <ArrowDropDownIcon />
          </MenuItem>,
          <MenuMaterial
            key="userMenuMaterial"
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            disableScrollLock={true}
          >
            <Box sx={{ padding: 2, minWidth: 200 }}>
              <MenuItem onClick={handleUserInfoClick}>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Box>
          </MenuMaterial>,
          
          showUserInfo && (
            <Backdrop
              key="userInfoBackdrop"
              open={showUserInfo}
              onClick={handleUserInfoClose}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box 
                onClick={(e) => e.stopPropagation()}
                sx={{ 
                  bgcolor: 'background.paper', 
                  p: 4, 
                  borderRadius: 2,
                  minWidth: 300,
                  color: 'text.primary',
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <IconButton sx={{ mb: 2, justifyContent: 'center'}}>
                  <AccountCircleIcon fontSize="large" sx={{ width: '100px', height: '100px'}}/>
                </IconButton>
                
                {isLoading && <CircularProgress />}
                
                {error && (
                  <Typography color="error" variant="body1">
                    {error.message}
                  </Typography>
                )}
                
                {user && (
                  <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Xin chào, {user.name}
                    </Typography>
                    <Typography variant="body1">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body1" textAlign={'left'}>
                      Role: {getRoleString(user.role)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Backdrop>
          )
        ]
      );
    }

    return (
      <MenuItem component={Link} href="/user/login">
        <Button 
          sx={{
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'uppercase',
            bgcolor:'#ffffff',
            color: '(theme)=> theme.palette.primary.dark',
            padding: '8px 22px',
            borderRadius: '8px 8px 8px 0',
            '&:hover': {
              bgcolor: '#f0f0f0', 
              opacity: 0.9,
            }
          }}>
            Đăng nhập
        </Button>
      </MenuItem>
    );
  };

  return (
    <MenuList sx={{ display: 'flex', flexDirection: 'row', gap: '4px'}}>
      <MenuItem component={Link} href="/">
        <Typography variant='body1'>
          Trang chủ
        </Typography>
      </MenuItem>
      <MenuItem component={Link} href="/dashboard/register-injection">
        <Typography variant='body1'>
          Đăng ký tiêm
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={handleClick}
        sx={{alignItems: 'center'}}
      >
        <Typography>
          Tra cứu
        </Typography>
        <ArrowDropDownIcon />
      </MenuItem>
      <MenuMaterial
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
          <MenuItem onClick={handleClose}>
            <Link href="/dashboard/lookup/certificate" passHref>
              <Box sx={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <Box sx={{ 
                  backgroundColor: '#EDE7F6', 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderRadius: '8px'
                }}>
                  <GroupIcon sx={{ color: '#5E35B1' }} />
                </Box>
                <Typography variant='body1' sx={{textAlign: 'center'}}>
                  Tra cứu chứng nhận tiêm
                  <Typography style={{display: 'block', fontSize:'12px'}}>Cập nhật nhanh và chính xác nhất</Typography>
                </Typography>
                <EastIcon sx={{color: '#5E35B1'}}/>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/dashboard/lookup/registration-result" passHref>
              <Box sx={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <Box sx={{ 
                  backgroundColor: '#F8F8F8', 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderRadius: '8px'
                }}>
                  <GroupIcon sx={{ color: '#1E88E5' }} />
                </Box>
                <Typography variant='body1' sx={{textAlign: 'center'}}>
                  Tra cứu kết quả đăng ký
                  <Typography style={{display: 'block', fontSize:'12px'}}>Cập nhật nhanh và chính xác nhất</Typography>
                </Typography>
                <EastIcon sx={{color: '#1E88E5'}}/>
              </Box>
            </Link>
          </MenuItem>
        </Box>
      </MenuMaterial>
      <MenuItem component={Link} href="#">
        <Typography>
          Tài liệu
        </Typography>
      </MenuItem>
      {renderUserMenu()}
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
      background: 'var(--header-color)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
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
