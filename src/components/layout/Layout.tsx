
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-soft text-crypto-primary font-display text-2xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">{children}</main>
      <footer className="bg-crypto-dark text-white py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-display font-bold text-xl">Catalyst Club</h3>
              <p className="text-sm text-gray-400">Connect, Invest, Grow</p>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Catalyst Club. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
