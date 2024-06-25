import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    <main>
      <div>User Page</div>
      <Link href="/user/login">Đăng nhập</Link>
    </main>
    
  )
}

export default UserPage