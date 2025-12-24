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

    </div>
  );
}
