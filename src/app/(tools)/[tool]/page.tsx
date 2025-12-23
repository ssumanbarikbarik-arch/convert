import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools';
import { ToolClientPage } from './client-page';
import type { Metadata } from 'next';

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

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = tools.find(t => t.slug === params.tool);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: tool.color }}
        >
          <tool.icon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 font-headline">
          {tool.name}
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground md:text-lg">
          {tool.description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ToolClientPage tool={tool} />
      </div>
    </div>
  );
}
