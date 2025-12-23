import React from 'react';
import Link from 'next/link';
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
import { ChevronDown, Heart } from 'lucide-react';
import { tools, ToolCategory } from '@/lib/tools';
import { cn } from '@/lib/utils';

export function Header() {
  const isLoggedIn = false;

  const categories: ToolCategory[] = [
    'Organize PDF',
    'Optimize PDF',
    'Convert to PDF',
    'Convert from PDF',
    'Edit PDF',
    'PDF Security',
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
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
                All PDF Tools
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px]" align="start">
              <div className="grid grid-cols-3 gap-4 p-4">
                {categories.map((category) => (
                  <React.Fragment key={category}>
                    <div className="flex flex-col space-y-2">
                      <DropdownMenuLabel className="font-semibold text-base p-0">
                        {category}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {tools
                        .filter((tool) => tool.category === category)
                        .map((tool) => (
                          <DropdownMenuItem key={tool.slug} asChild>
                            <Link
                              href={`/${tool.slug}`}
                              className="flex items-center gap-2"
                            >
                              <tool.icon
                                className={cn('h-4 w-4')}
                                style={{ color: tool.color }}
                              />
                              {tool.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

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
