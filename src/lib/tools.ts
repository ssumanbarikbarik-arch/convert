import {
  FileImage,
  FileText,
  FileSpreadsheet,
  Combine,
  Split,
  Shrink,
  Link,
  type LucideIcon,
  BookText,
  ImageUp,
} from 'lucide-react';

export type Tool = {
  slug: string;
  name: string;
  description: string;
  iconName: keyof typeof iconMap;
  icon: LucideIcon;
  color: string;
  accept?: string | string[];
};

export const iconMap = {
  Combine,
  Split,
  Shrink,
  FileText,
  FileSpreadsheet,
  FileImage,
  Link,
  BookText,
  ImageUp,
};

export const tools: Tool[] = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one single document.',
    iconName: 'Combine',
    icon: Combine,
    color: '#ef4444',
    accept: 'application/pdf',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract one or more pages from your PDF.',
    iconName: 'Split',
    icon: Split,
    color: '#f97316',
    accept: 'application/pdf',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce the size of your PDF without losing quality.',
    iconName: 'Shrink',
    icon: Shrink,
    color: '#eab308',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert your PDFs to editable Word documents.',
    iconName: 'FileText',
    icon: FileText,
    color: '#2563eb',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Convert PDF data to Excel spreadsheets.',
    iconName: 'FileSpreadsheet',
    icon: FileSpreadsheet,
    color: '#16a34a',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG image.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#c026d3',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-png',
    name: 'PDF to PNG',
    description: 'Convert each PDF page into a PNG image.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#db2777',
    accept: 'application/pdf',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format.',
    iconName: 'FileText',
    icon: FileText,
    color: '#2563eb',
    accept: ['.doc', '.docx'],
  },
  {
    slug: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF documents.',
    iconName: 'FileSpreadsheet',
    icon: FileSpreadsheet,
    color: '#16a34a',
    accept: ['.xls', '.xlsx'],
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to a PDF document.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#c026d3',
    accept: 'image/jpeg',
  },
  {
    slug: 'png-to-pdf',
    name: 'PNG to PDF',
    description: 'Convert PNG images to a PDF document.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#db2777',
    accept: 'image/png',
  },
  {
    slug: 'url-to-pdf',
    name: 'URL to PDF',
    description: 'Convert any webpage into a PDF document.',
    iconName: 'Link',
    icon: Link,
    color: '#64748b',
  },
  {
    slug: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Get a quick summary of any PDF document using AI.',
    iconName: 'BookText',
    icon: BookText,
    color: '#6d28d9',
    accept: 'application/pdf',
  },
  {
    slug: 'image-to-url',
    name: 'Host Image to URL',
    description: 'Upload an image and get a shareable URL.',
    iconName: 'ImageUp',
    icon: ImageUp,
    color: '#0891b2',
    accept: 'image/*',
  },
];
