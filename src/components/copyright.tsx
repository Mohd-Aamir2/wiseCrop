"use client";

import { useState, useEffect } from 'react';

export function Copyright() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <p className="text-sm text-muted-foreground mt-4 sm:mt-0">&copy; {year} CropWise. All rights reserved.</p>
  );
}
