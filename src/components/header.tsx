import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function Header() {
  const isLoggedIn = false;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl font-logo text-gray-800">
              Swift
            </span>
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="font-bold text-2xl font-logo text-primary">
              Convert
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isLoggedIn ? (
            // Logged in user menu
            <div />
          ) : (
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
