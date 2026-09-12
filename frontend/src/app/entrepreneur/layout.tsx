'use client';

import React from 'react';
import { EntrepreneurLayout } from '@/components/layout/EntrepreneurLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EntrepreneurLayout>{children}</EntrepreneurLayout>;
}
