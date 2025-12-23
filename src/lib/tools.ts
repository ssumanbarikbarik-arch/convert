import {
  FileImage,
  FileText,
  Combine,
  Split,
  Shrink,
  type LucideIcon,
  BookText,
  ImageUp,
  ScanText,
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
  FileImage,
  BookText,
  ImageUp,
  ScanText,
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
    slug: 'compress-image',
    name: 'Compress Image',
    description: 'Reduce the file size of your JPG & PNG images.',
    iconName: 'Shrink',
    icon: Shrink,
    color: '#10b981',
    accept: ['image/png', 'image/jpeg'],
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
    slug: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Get a quick summary of any PDF document using AI.',
    iconName: 'BookText',
    icon: BookText,
    color: '#6d28d9',
    accept: 'application/pdf',
  },
  {
    slug: 'host-image-to-url',
    name: 'Host Image to URL',
    description: 'Upload an image and get a shareable URL.',
    iconName: 'ImageUp',
    icon: ImageUp,
    color: '#0891b2',
    accept: 'image/*',
  },
  {
    slug: 'pdf-to-text',
    name: 'PDF to Text',
    description: 'Extract text from any PDF document.',
    iconName: 'FileText',
    icon: FileText,
    color: '#3b82f6',
    accept: 'application/pdf',
  },
  {
    slug: 'image-to-text',
    name: 'Image to Text',
    description: 'Extract text from any image using OCR.',
    iconName: 'ScanText',
    icon: ScanText,
    color: '#22c55e',
    accept: 'image/*',
  },
];
