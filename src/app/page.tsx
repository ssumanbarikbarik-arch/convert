import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tools, iconMap } from '@/lib/tools';

export default function Home() {
  const toolCategories = [
    {
      title: 'Organize PDF',
      tools: [
        'merge-pdf',
        'split-pdf',
        'remove-pages',
        'extract-pages',
        'organize-pdf',
        'scan-to-pdf',
      ],
    },
    {
      title: 'Optimize PDF',
      tools: ['compress-pdf', 'repair-pdf', 'ocr-pdf'],
    },
    {
      title: 'Convert to PDF',
      tools: [
        'jpg-to-pdf',
        'word-to-pdf',
        'powerpoint-to-pdf',
        'excel-to-pdf',
        'html-to-pdf',
      ],
    },
    {
      title: 'Convert from PDF',
      tools: [
        'pdf-to-jpg',
        'pdf-to-word',
        'pdf-to-powerpoint',
        'pdf-to-excel',
        'pdf-to-pdfa',
      ],
    },
    {
      title: 'Edit PDF',
      tools: ['rotate-pdf', 'add-page-numbers', 'add-watermark', 'edit-pdf'],
    },
    {
      title: 'PDF Security',
      tools: ['unlock-pdf', 'protect-pdf', 'sign-pdf', 'redact-pdf'],
    },
  ];

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
                  {category.tools
                    .map((slug) => tools.find((tool) => tool.slug === slug))
                    .filter((tool) => !!tool)
                    .map((tool) => {
                      if (!tool) return null;
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
          </div>
        </Card>
      </section>
    </div>
  );
}
