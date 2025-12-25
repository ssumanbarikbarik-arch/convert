'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { tools as allTools, iconMap, Tool } from '@/lib/tools';
import Adsense from '@/components/adsense';
import { Header } from '@/components/header';

export function HomeClient() {
  const [tools, setTools] = useState<Tool[]>(allTools);

  const handleSearch = (query: string) => {
    if (!query) {
      setTools(allTools);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredTools = allTools.filter(
      tool =>
        tool.name.toLowerCase().includes(lowerCaseQuery) ||
        tool.description.toLowerCase().includes(lowerCaseQuery) ||
        tool.category.toLowerCase().includes(lowerCaseQuery)
    );
    setTools(filteredTools);
  };

  return (
    <>
      <Header onSearchChange={handleSearch} />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-headline">
            The All-in-One File Conversion Tools
          </h1>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Swiftly convert, merge, split, and compress your files with our suite
            of powerful online tools.
          </p>
        </section>

        <Adsense />

        <section className="max-w-7xl mx-auto">
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tools.map(tool => {
                const Icon = iconMap[tool.iconName];
                return (
                  <Link
                    href={`/${tool.slug}`}
                    key={tool.slug}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col hover:border-primary">
                      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: tool.color }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-2">No tools found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search query.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
