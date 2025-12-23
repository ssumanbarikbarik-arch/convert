import {
  FileImage,
  FileText,
  Combine,
  Split,
  Shrink,
  type LucideIcon,
  BookText,
  ImageUp,
  FileJson,
  FileUp,
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
  FileJson,
  ScanText,
  FileUp,
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
    description: 'Convert a PDF to an editable text file.',
    iconName: 'FileUp',
    icon: FileUp,
    color: '#22c55e',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert a PDF page to a JPG or PNG image.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#84cc16',
    accept: 'application/pdf',
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert a JPG or PNG image to a PDF document.',
    iconName: 'FileImage',
    icon: FileImage,
    color: '#14b8a6',
    accept: ['image/jpeg', 'image/png'],
  },
  {
    slug: 'image-to-text',
    name: 'Image to Text',
    description: 'Extract text from an image using OCR.',
    iconName: 'ScanText',
    icon: ScanText,
    color: '#22c55e',
    accept: ['image/png', 'image/jpeg', 'image/webp'],
  },
  {
    slug: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Let AI summarize your PDF documents.',
    iconName: 'BookText',
    icon: BookText,
    color: '#10b981',
    accept: 'application/pdf',
  },
  {
    slug: 'host-image-to-url',
    name: 'Host Image to URL',
    description: 'Upload an image and get a shareable URL.',
    iconName: 'ImageUp',
    icon: ImageUp,
    color: '#06b6d4',
    accept: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  },
   {
    slug: 'url-to-pdf',
    name: 'URL to PDF',
    description: 'Convert any website URL to a PDF document.',
    iconName: 'FileJson',
    icon: FileJson,
    color: '#3b82f6',
  },
];
