'use client';

import React from 'react';
import { OfficerLayout } from '@/components/layout/OfficerLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OfficerLayout>{children}</OfficerLayout>;
}
