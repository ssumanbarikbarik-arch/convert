import { notFound } from 'next/navigation';
import { tools, iconMap } from '@/lib/tools';
import { ToolClientPage } from './client-page';
import type { Metadata } from 'next';
import type { Tool } from '@/lib/tools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return tools.map(tool => ({
    tool: tool.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { tool: string };
}): Metadata {
  const tool = tools.find(t => t.slug === params.tool);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  return {
    title: `${tool.name} | SwiftConvert`,
    description: tool.description,
  };
}

// We can't pass the icon component to the client component, so we pass the name.
type ClientTool = Omit<Tool, 'icon'>;

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = tools.find(t => t.slug === params.tool);

  if (!tool) {
    notFound();
  }

  const Icon = iconMap[tool.iconName];
  const clientTool: ClientTool = {
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    iconName: tool.iconName,
    accept: tool.accept,
  };


  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <div className="relative mb-8">
        <Button asChild variant="outline" className="absolute -top-4 left-0">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>
      <div className="text-center mb-8 pt-8">
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: tool.color }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 font-headline">
          {tool.name}
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground md:text-lg">
          {tool.description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ToolClientPage tool={clientTool} />
      </div>
    </div>
  );
}
