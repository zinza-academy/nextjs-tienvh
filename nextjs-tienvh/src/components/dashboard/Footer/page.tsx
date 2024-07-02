import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <Box sx={{
      width: '100%',
      height: 'var(--footer-height)',
      display: 'flex',
      justifyContent: 'space-between',
      paddingX: '16px',
      paddingY: '32px',
      color: '#ffffff',
      background: theme => theme.palette.primary.main,
    }}>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
        <Typography variant='body2'>
          © Bản quyền thuộc 
          <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}> Trung tâm công nghệ phòng, chống dịch covid-19 quốc gia</span>
        </Typography>
        <Typography variant='body2'>
          Phát triển bởi
          <span style={{color: '#d32f2f'}}> Viettel</span>
        </Typography>
        <Box>
          <Image
             src="/img/logo2.png"
             alt="logo footer"
             width={195}
             height={89}
          />

        </Box>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end'}}>
        <Typography variant='body2'>
          Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px', maxHeight: 40}}>
          <Button 
            sx={{
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 'Medium',
              border: '1px solid',
              padding: '8px 22px',
              borderRadius: '8px 8px 8px 0',
              '&:hover': {
                color: '#ccc',
                opacity: 0.9,
              }
            }}>
              App tiêm di động (Cho HCM)
             </Button>

              <Button 
                 sx={{
                  color: '#ffffff',
                  border: '1px solid',
                  fontSize: 16,
                  fontWeight: 'Medium',
                  padding: '8px 22px',
                  borderRadius: '8px 8px 8px 0',
                  '&:hover': {
                    color: '#ccc',
                    opacity: 0.9,
                  }
                }}>
                  App Store
                </Button>
              <Button 
                sx={{
                  color: '#ffffff',
                  border: '1px solid',
                  padding: '8px 22px',
                  fontSize: 16,
                  fontWeight: 'Medium',
                  borderRadius: '8px 8px 8px 0',
                  '&:hover': {
                    color: '#ccc',
                    opacity: 0.9,
                  }
                }}>
                  Google Play
              </Button>
        </Box>
        <Image
             src="/img/handle_cert.png"
             alt="logo certiicate"
             width={220}
             height={100}
          />
    
      </Box>
    </Box>
  )
}

export default Footer
