import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <main>
    <h1>Hello</h1>
    <Button variant="contained" href="/user/login">Đăng nhập </Button>
  </main>
    
  )
}

export default HomePage
