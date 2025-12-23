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
  RefreshCcw,
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
  RefreshCcw,
};

export const tools: Tool[] = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one single document.',
    iconName: 'Combine',
    icon: Combine,
    color: 'hsl(3, 80%, 62%)',
    accept: 'application/pdf',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract one or more pages from your PDF.',
    iconName: 'Split',
    icon: Split,
    color: 'hsl(283, 75%, 53%)',
    accept: 'application/pdf',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce the size of your PDF without losing quality.',
    iconName: 'Shrink',
    icon: Shrink,
    color: 'hsl(92, 49%, 51%)',
    accept: 'application/pdf',
  },
  {
    slug: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Get a quick summary of any PDF document using AI.',
    iconName: 'BookText',
    icon: BookText,
    color: 'hsl(215, 87%, 52%)',
    accept: 'application/pdf',
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF documents.',
    iconName: 'FileImage',
    icon: FileImage,
    color: 'hsl(47, 98%, 52%)',
    accept: 'image/jpeg',
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert PNG, JPG, and other images to PDF.',
    iconName: 'FileImage',
    icon: FileImage,
    color: 'hsl(47, 98%, 52%)',
    accept: 'image/*',
  },
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert a PDF to an editable text file.',
    iconName: 'FileText',
    icon: FileText,
    color: 'hsl(215, 87%, 52%)',
    accept: 'application/pdf',
  },
  {
    slug: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert pages from a PDF into PNG images.',
    iconName: 'FileImage',
    icon: FileImage,
    color: 'hsl(47, 98%, 52%)',
    accept: 'application/pdf',
  },
  {
    slug: 'url-to-pdf',
    name: 'URL to PDF',
    description: 'Convert any webpage into a PDF document.',
    iconName: 'FileJson',
    icon: FileJson,
    color: 'hsl(160, 84%, 39%)',
  },
  {
    slug: 'host-image-to-url',
    name: 'Host Image to URL',
    description: 'Upload an image and get a shareable URL.',
    iconName: 'ImageUp',
    icon: ImageUp,
    color: 'hsl(283, 75%, 53%)',
    accept: 'image/*',
  },
];
