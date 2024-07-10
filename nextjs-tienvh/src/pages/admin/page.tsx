import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AdminComponent() {
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === '/admin/injection-location') setValue(0);
    else if (pathname === '/admin/registration') setValue(1);
    else if (pathname === '/admin/document') setValue(2);
  }, [pathname]);

  return (
    <div style={{margin: '0 36px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative'}}>
        <Tabs value={value}>
          <Tab label="Địa điểm tiêm" component={Link} href="/admin/injection-location" sx={{ paddingY: '16px' }} />
          <Tab label="Đăng ký" component={Link} href="/admin/registration" />
          <Tab label="Tài liệu" component={Link} href="/admin/document" />
        </Tabs>
        <Divider sx={{ position: 'absolute', height: '3px', bottom: 0, width: '100%', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }} />
      </Box>
    </div>
  );
}

export default AdminComponent;
