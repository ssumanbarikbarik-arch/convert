import {
  FileImage,
  FileText,
  FileSpreadsheet,
  Combine,
  Split,
  Shrink,
  Link,
  type LucideIcon,
  BookText
} from 'lucide-react';

export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accept?: string | string[];
};

export const tools: Tool[] = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one single document.',
    icon: Combine,
    color: '#ef4444',
    accept: 'application/pdf',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract one or more pages from your PDF.',
    icon: Split,
    color: '#f97316',
    accept: 'application/pdf',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce the size of your PDF without losing quality.',
    icon: Shrink,
    color: '#eab308',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert your PDFs to editable Word documents.',
    icon: FileText,
    color: '#2563eb',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Convert PDF data to Excel spreadsheets.',
    icon: FileSpreadsheet,
    color: '#16a34a',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG image.',
    icon: FileImage,
    color: '#c026d3',
    accept: 'application/pdf',
  },
    {
    slug: 'pdf-to-png',
    name: 'PDF to PNG',
    description: 'Convert each PDF page into a PNG image.',
    icon: FileImage,
    color: '#db2777',
    accept: 'application/pdf',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format.',
    icon: FileText,
    color: '#2563eb',
    accept: ['.doc', '.docx'],
  },
  {
    slug: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF documents.',
    icon: FileSpreadsheet,
    color: '#16a34a',
    accept: ['.xls', '.xlsx'],
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to a PDF document.',
    icon: FileImage,
    color: '#c026d3',
    accept: 'image/jpeg',
  },
  {
    slug: 'png-to-pdf',
    name: 'PNG to PDF',
    description: 'Convert PNG images to a PDF document.',
    icon: FileImage,
    color: '#db2777',
    accept: 'image/png',
  },
  {
    slug: 'url-to-pdf',
    name: 'URL to PDF',
    description: 'Convert any webpage into a PDF document.',
    icon: Link,
    color: '#64748b',
  },
  {
    slug: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Get a quick summary of any PDF document using AI.',
    icon: BookText,
    color: '#6d28d9',
    accept: 'application/pdf',
  },
];
