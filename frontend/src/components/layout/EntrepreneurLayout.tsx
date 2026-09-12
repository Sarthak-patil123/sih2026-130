'use client';

import React, { useState, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { FooterDisclaimer } from './FooterDisclaimer';

export interface EntrepreneurLayoutProps {
  children: ReactNode;
}

export const EntrepreneurLayout: React.FC<EntrepreneurLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      
      <div className="flex flex-1 w-full relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-200">
          {children}
        </main>
      </div>
      
      <FooterDisclaimer />
    </div>
  );
};

