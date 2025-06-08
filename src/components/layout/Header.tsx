"use client";
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserPlus, LayoutDashboard, HomeIcon } from 'lucide-react';

export default function Header() {
  const { currentUser, logout, loading } = useAuth();

  return (
    <header className="bg-card text-card-foreground shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-headline text-primary hover:text-accent transition-colors">
          ProfileForge
        </Link>
        <div className="space-x-2 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><HomeIcon className="mr-2 h-4 w-4" />Home</Link>
          </Button>
          {loading ? (
            <Button variant="ghost" size="sm" disabled>Loading...</Button>
          ) : currentUser ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/register"><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
