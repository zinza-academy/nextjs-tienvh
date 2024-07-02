import React, { useState } from 'react';
import { Box, Typography, MenuList, MenuItem, Button, Menu as MenuMaterial } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupIcon from '@mui/icons-material/Group';
import EastIcon from '@mui/icons-material/East';
function Menu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      >
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
          <MenuItem onClick={handleClose}>
            <Link href="#" passHref>
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
                    <span style={{display: 'block', fontSize:'12px'}}>Cập nhật nhanh và chính xác nhất</span>
                    </Typography>
                  <EastIcon sx={{color: '#5E35B1'}}/>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Link href="#" passHref>
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
                    <span style={{display: 'block', fontSize:'12px'}}>Cập nhật nhanh và chính xác nhất</span>
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
