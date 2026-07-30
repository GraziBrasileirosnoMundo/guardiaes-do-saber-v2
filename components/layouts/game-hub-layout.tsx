'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameHubLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  bottomNav: React.ReactNode;
}

export function GameHubLayout({ sidebar, main, bottomNav }: GameHubLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile/Tablet: Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-purple-600/50 hover:bg-purple-600 text-white transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar - Desktop Always Visible */}
        <div className="hidden lg:block w-64 bg-gradient-to-b from-purple-900/80 to-slate-900/80 border-r border-purple-700/30 p-4 overflow-y-auto">
          {sidebar}
        </div>

        {/* Sidebar - Mobile/Tablet Drawer */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            className="lg:hidden fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-purple-900 to-slate-900 border-r border-purple-700/30 p-4 z-30 overflow-y-auto"
          >
            {sidebar}
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-20">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            {main}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile/Tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-900/80 border-t border-purple-700/30 z-20">
        {bottomNav}
      </div>

      {/* Bottom Navigation - Desktop (inside main area) */}
      <div className="hidden lg:block fixed bottom-0 left-64 right-0 bg-gradient-to-t from-slate-900 to-slate-900/80 border-t border-purple-700/30">
        {bottomNav}
      </div>
    </div>
  );
}
