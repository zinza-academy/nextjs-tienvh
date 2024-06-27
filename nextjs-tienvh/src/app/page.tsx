
import { Button } from "@mui/material";
import React, { Suspense } from "react";
const LazyHomePage = React.lazy(() => import('@/app/dashboard/home/page'));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHomePage />
      </Suspense>
    </main>
  );
}
