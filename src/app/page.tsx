import Link from 'next/link';
import {
  Card,
} from '@/components/ui/card';
import { tools, iconMap } from '@/lib/tools';

export default function Home() {
  const toolCategories = [
    {
      title: 'Organize PDF',
      category: 'Organize PDF',
      tools: tools.filter(t => t.category === 'Organize PDF'),
    },
    {
      title: 'Optimize PDF',
      category: 'Optimize PDF',
      tools: tools.filter(t => t.category === 'Optimize PDF'),
    },
    {
      title: 'Convert to PDF',
      category: 'Convert to PDF',
      tools: tools.filter(t => t.category === 'Convert to PDF'),
    },
    {
      title: 'Convert from PDF',
      category: 'Convert from PDF',
      tools: tools.filter(t => t.category === 'Convert from PDF'),
    },
    {
      title: 'Edit PDF',
      category: 'Edit PDF',
      tools: tools.filter(t => t.category === 'Edit PDF'),
    },
    {
      title: 'PDF Security',
      category: 'PDF Security',
      tools: tools.filter(t => t.category === 'PDF Security'),
    },
  ];

  const allTools = tools.filter(
    t => t.category === 'All'
  );

  return (
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

      <section className="max-w-6xl mx-auto">
        <Card className="p-8 md:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
            {toolCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.tools.map((tool) => {
                    const Icon = iconMap[tool.iconName];
                    return (
                      <Link
                        href={`/${tool.slug}`}
                        key={tool.slug}
                        className="group"
                      >
                        <div className="flex items-center gap-3 transition-colors duration-200 hover:text-primary">
                          <div
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300"
                            style={{ backgroundColor: tool.color }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-sm">
                            {tool.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
             {allTools.map((tool) => {
                const Icon = iconMap[tool.iconName];
                return (
                  <div key={tool.slug} className="space-y-4">
                     <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                      {tool.name}
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href={`/${tool.slug}`}
                        className="group"
                      >
                        <div className="flex items-center gap-3 transition-colors duration-200 hover:text-primary">
                          <div
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300"
                            style={{ backgroundColor: tool.color }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-sm">
                            {tool.name}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </section>
    </div>
  );
}