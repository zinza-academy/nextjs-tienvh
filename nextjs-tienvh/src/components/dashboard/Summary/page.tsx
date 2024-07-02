import { Box, Divider } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function Summary() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', paddingX: '36px', background: '#F7FBFE',  paddingTop: `calc(var(--header-height) + 24px)`, paddingBottom: '24px'}}>
      <Box sx={{display:'flex', background: '#ffffff', flexGrow: 1, padding:'16px', gap: "16px", alignItems:'center'}}>
        <Image 
              src="/img/ic_register_people_1.png"
              alt="ic_register"
              width={46}
              height={44}
            />
          <Box sx={{display: 'flex', flexDirection:'column',alignItems: 'center'}}>
              <span style={{display: 'inline-block', fontSize: 16, fontWeight: 'bold'}}>Đối tượng đăng ký tiêm</span>
              <span style={{ fontSize: 28, fontWeight: '500'}}>11,203,873 <span style={{ fontSize: 13, fontWeight: '500', fontStyle: 'italic'}}>(lượt)</span></span>
          </Box>
          
      </Box>
      <Divider orientation="vertical" sx={{ height: 'auto', alignSelf: 'stretch', backgroundColor: '#EEEEEE' }} />
      <Box sx={{display:'flex', background: '#ffffff', flexGrow: 1, padding:'16px', gap: "16px", alignItems:'center'}}>
        <Image
              src="/img/ic_injection.png"
              alt="ic_injection"
              width={44}
              height={44}
            />
          <Box sx={{display: 'flex', flexDirection:'column',alignItems: 'center'}}>
              <span style={{display: 'inline-block', fontSize: 16, fontWeight: 'bold'}}>Đối tượng đăng ký tiêm</span>
              <span style={{ fontSize: 28, fontWeight: '500'}}>1,762,119 <span style={{ fontSize: 13, fontWeight: '500', fontStyle: 'italic'}}>(mũi)</span></span>
          </Box>
      </Box>
      <Divider orientation="vertical" sx={{ height: 'auto', alignSelf: 'stretch', backgroundColor: '#EEEEEE' }} />
      <Box sx={{display:'flex', background: '#ffffff', flexGrow: 1, padding:'16px', gap: "16px", alignItems:'center'}}>
        <Image
              src="/img/ic_injected_people.png"
              alt="ic_register"
              width={36}
              height={40}
            />
          <Box sx={{display: 'flex', flexDirection:'column',alignItems: 'center'}}>
              <span style={{display: 'inline-block', fontSize: 16, fontWeight: 'bold'}}>Số mũi đã tiêm toàn quốc</span>
              <span style={{ fontSize: 28, fontWeight: '500'}}>69,523,654 <span style={{ fontSize: 13, fontWeight: '500', fontStyle: 'italic'}}>(mũi)</span></span>
          </Box>
      </Box>
    </Box>
  )
}

export default Summary
