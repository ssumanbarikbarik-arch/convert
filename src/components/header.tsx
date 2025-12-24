'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { tools, iconMap } from '@/lib/tools';
import { ChevronDown, Heart } from 'lucide-react';
import React from 'react';

const organizeTools = tools.filter(
  (tool) =>
    tool.slug === 'merge-pdf' ||
    tool.slug === 'split-pdf' ||
    tool.slug === 'remove-pages' ||
    tool.slug === 'extract-pages' ||
    tool.slug === 'organize-pdf' ||
    tool.slug === 'scan-to-pdf'
);
const optimizeTools = tools.filter(
  (tool) =>
    tool.slug === 'compress-pdf' ||
    tool.slug === 'repair-pdf' ||
    tool.slug === 'ocr-pdf'
);
const convertToPdfTools = tools.filter(
  (tool) =>
    tool.slug === 'jpg-to-pdf' ||
    tool.slug === 'word-to-pdf' ||
    tool.slug === 'powerpoint-to-pdf' ||
    tool.slug === 'excel-to-pdf' ||
    tool.slug === 'html-to-pdf'
);
const convertFromPdfTools = tools.filter(
  (tool) =>
    tool.slug === 'pdf-to-jpg' ||
    tool.slug === 'pdf-to-word' ||
    tool.slug === 'pdf-to-powerpoint' ||
    tool.slug === 'pdf-to-excel' ||
    tool.slug === 'pdf-to-pdfa'
);
const editPdfTools = tools.filter(
  (tool) =>
    tool.slug === 'rotate-pdf' ||
    tool.slug === 'add-page-numbers' ||
    tool.slug === 'add-watermark' ||
    tool.slug === 'edit-pdf'
);
const pdfSecurityTools = tools.filter(
  (tool) =>
    tool.slug === 'unlock-pdf' ||
    tool.slug === 'protect-pdf' ||
    tool.slug === 'sign-pdf' ||
    tool.slug === 'redact-pdf'
);

export function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl font-logo">
              <span className="text-foreground">Swift</span>
              <span className="text-destructive">Convert</span>
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/merge-pdf"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Merge PDF
          </Link>
          <Link
            href="/split-pdf"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Split PDF
          </Link>
          <Link
            href="/compress-pdf"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Compress PDF
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 px-0"
              >
                Convert PDF
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px]" align="start">
              <div className="grid grid-cols-2 gap-4 p-4">
                <React.Fragment>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenuLabel className="font-semibold text-base p-0">
                      Convert to PDF
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {convertToPdfTools.map((tool) => {
                      const Icon = iconMap[tool.iconName];
                      return (
                        <DropdownMenuItem key={tool.slug} asChild>
                          <Link
                            href={`/${tool.slug}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" style={{color: tool.color}} />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenuLabel className="font-semibold text-base p-0">
                      Convert from PDF
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {convertFromPdfTools.map((tool) => {
                      const Icon = iconMap[tool.iconName];
                      return (
                        <DropdownMenuItem key={tool.slug} asChild>
                          <Link
                            href={`/${tool.slug}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" style={{color: tool.color}} />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </React.Fragment>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 px-0"
              >
                All PDF Tools
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px]" align="start">
              <div className="grid grid-cols-3 gap-4 p-4">
                <React.Fragment>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenuLabel className="font-semibold text-base p-0">
                      Organize PDF
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {organizeTools.map((tool) => {
                      const Icon = iconMap[tool.iconName];
                      return (
                        <DropdownMenuItem key={tool.slug} asChild>
                          <Link
                            href={`/${tool.slug}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" style={{color: tool.color}} />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenuLabel className="font-semibold text-base p-0">
                      Edit PDF
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {editPdfTools.map((tool) => {
                      const Icon = iconMap[tool.iconName];
                      return (
                        <DropdownMenuItem key={tool.slug} asChild>
                          <Link
                            href={`/${tool.slug}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" style={{color: tool.color}} />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenuLabel className="font-semibold text-base p-0">
                      PDF Security
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {pdfSecurityTools.map((tool) => {
                      const Icon = iconMap[tool.iconName];
                      return (
                        <DropdownMenuItem key={tool.slug} asChild>
                          <Link
                            href={`/${tool.slug}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" style={{color: tool.color}} />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </React.Fragment>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {!isUserLoading &&
            (user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL ?? ''}
                        alt={user.displayName ?? 'User'}
                      />
                      <AvatarFallback>
                        {getInitials(
                          user.displayName?.split(' ')[0],
                          user.displayName?.split(' ')[1]
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/history')}>
                    History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </nav>
            ))}
        </div>
      </div>
    </header>
  );
}
