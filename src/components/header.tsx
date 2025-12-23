import React from 'react';
import Link from 'next/link';
import { ChevronDown, Grid3x3, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { tools, ToolCategory } from '@/lib/tools';

const categorizedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, typeof tools>);

  const categoryOrder: ToolCategory[] = [
    'Organize PDF', 'Optimize PDF', 'Convert to PDF', 'Convert from PDF', 'Edit PDF', 'PDF Security'
  ];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
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
           <Link href="/merge-pdf" className="hover:text-primary transition-colors">MERGE PDF</Link>
           <Link href="/split-pdf" className="hover:text-primary transition-colors">SPLIT PDF</Link>
           <Link href="/compress-pdf" className="hover:text-primary transition-colors">COMPRESS PDF</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center hover:text-primary transition-colors outline-none">
                ALL PDF TOOLS <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                {categoryOrder.map((category, index) => (
                  <React.Fragment key={category}>
                    <DropdownMenuLabel>{category}</DropdownMenuLabel>
                    {categorizedTools[category]?.map(tool => (
                      <DropdownMenuItem key={tool.slug} asChild>
                        <Link href={`/${tool.slug}`}>{tool.name}</Link>
                      </DropdownMenuItem>
                    ))}
                    {index < categoryOrder.length - 1 && <DropdownMenuSeparator />}
                  </React.Fragment>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
           </div>
           <Button variant="ghost" size="icon" className='h-8 w-8'>
                <Grid3x3 className="h-5 w-5" />
           </Button>
        </div>
      </div>
    </header>
  );
}
