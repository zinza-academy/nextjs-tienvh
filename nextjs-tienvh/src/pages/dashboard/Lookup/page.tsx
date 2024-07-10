import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function LookupComponent() {
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === '/dashboard/lookup/certificate') setValue(0);
    else if (pathname === '/dashboard/lookup/registration-result') setValue(1);
    else if (pathname === '/dashboard/lookup/account') setValue(2);
  }, [pathname]);

  return (
    <div style={{margin: '0 36px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative'}}>
        <Tabs value={value}>
          <Tab label="Chứng nhận tiêm chủng" component={Link} href="/dashboard/lookup/certificate" sx={{ paddingY: '16px' }} />
          <Tab label="Kết quả đăng ký" component={Link} href="/dashboard/lookup/registration-result" />
          <Tab label="Tài khoản" component={Link} href="/dashboard/lookup/account" />
        </Tabs>
        <Divider sx={{ position: 'absolute', height: '3px', bottom: 0, width: '100%', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }} />
      </Box>
    </div>
  );
}

export default LookupComponent;
