'use client';

// Polyfill for Promise.withResolvers
if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function withResolvers<T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve: resolve!, reject: reject! };
  };
}

import React, { useState, useCallback, useRef } from 'react';
import type { Tool } from '@/lib/tools';
import {
  UploadCloud,
  File as FileIcon,
  Download,
  RotateCcw,
  X,
  Loader2,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { intelligentPdfCompression } from '@/ai/flows/intelligent-pdf-compression';
import { cn } from '@/lib/utils';
import { summarizePdf } from '@/ai/flows/pdf-summarization';
import { Textarea } from '@/components/ui/textarea';

type ConversionState = 'idle' | 'processing' | 'success' | 'error';
type ClientTool = Omit<Tool, 'icon'> & { iconName: string };

export function ToolClientPage({ tool }: { tool: ClientTool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [conversionState, setConversionState] =
    useState<ConversionState>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    name: string;
    analysis?: string;
    isObjectUrl?: boolean;
  } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isUrlTool = tool.slug === 'url-to-pdf';
  const isMultiFile = tool.slug === 'merge-pdf';
  const isImageToObjectUrlTool = tool.slug === 'image-to-object-url';

  const onFileChange = (newFiles: File[]) => {
    if (isMultiFile) {
        setFiles(prev => [...prev, ...newFiles]);
    } else {
        setFiles(newFiles.slice(0, 1));
    }
    setError(null);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles && droppedFiles.length > 0) {
        onFileChange(droppedFiles);
      }
    },
    [isMultiFile]
  );
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
        onFileChange(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    if (isUrlTool && !url) {
      setError('Please enter a URL.');
      return;
    }
    if (!isUrlTool && files.length === 0) {
      setError('Please select at least one file.');
      return;
    }

    setConversionState('processing');
    setProgress(0);
    setError(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      if (tool.slug === 'compress-pdf' && files.length > 0) {
        const pdfDataUri = await fileToDataUri(files[0]);
        const response = await intelligentPdfCompression({ pdfDataUri });

        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: response.compressedPdfDataUri,
          name: `compressed-${files[0].name}`,
          analysis: response.analysisSummary,
        });
      } else if (tool.slug === 'summarize-pdf' && files.length > 0) {
        const pdfDataUri = await fileToDataUri(files[0]);
        const response = await summarizePdf({pdfDataUri});
        
        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        
        const blob = new Blob([response.summary], { type: 'text/plain' });
        const resultUrl = URL.createObjectURL(blob);

        setResult({
          url: resultUrl,
          name: `summary-${files[0].name.replace(/\.pdf$/, '.txt')}`,
          analysis: 'PDF summarization complete.',
        });
      } else if (
        (tool.slug === 'jpg-to-pdf' || tool.slug === 'png-to-pdf') &&
        files.length > 0
      ) {
        const pdfLib = await import('pdf-lib');
        const pdfDoc = await pdfLib.PDFDocument.create();
        const imageFile = files[0];
        const imageBytes = await imageFile.arrayBuffer();
        
        let image;
        if (tool.slug === 'jpg-to-pdf') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          image = await pdfDoc.embedPng(imageBytes);
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const resultUrl = URL.createObjectURL(blob);
        
        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        
        setResult({
          url: resultUrl,
          name: `converted-${files[0].name.replace(/\.(jpg|jpeg|png)$/, '.pdf')}`,
        });
      } else if (
        (tool.slug === 'pdf-to-jpg' || tool.slug === 'pdf-to-png') &&
        files.length > 0
      ) {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).toString();

        const fileBytes = await files[0].arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: fileBytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Get the first page
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!context) {
          throw new Error('Could not get canvas context');
        }

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;

        const imageFormat = tool.slug === 'pdf-to-jpg' ? 'image/jpeg' : 'image/png';
        const fileExtension = tool.slug === 'pdf-to-jpg' ? 'jpg' : 'png';
        const resultUrl = canvas.toDataURL(imageFormat);

        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        
        setResult({
          url: resultUrl,
          name: `converted-${files[0].name.replace(/\.pdf$/, `.${fileExtension}`)}`,
        });

      } else if (isImageToObjectUrlTool && files.length > 0) {
        const objectUrl = URL.createObjectURL(files[0]);
        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: objectUrl,
          name: `object-url-for-${files[0].name}.txt`,
          isObjectUrl: true,
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        
        const pdfLib = await import('pdf-lib');
        const pdfDoc = await pdfLib.PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText(`This is a placeholder for ${tool.name}.`);
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const resultUrl = URL.createObjectURL(blob);
        
        setResult({
          url: resultUrl,
          name: isUrlTool
            ? 'converted-page.pdf'
            : `converted-${files[0]?.name || 'file'}.pdf`,
        });
      }
    } catch (e) {
      clearInterval(progressInterval);
      setConversionState('error');
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Conversion failed: ${errorMessage}`);
      toast({
        title: 'Conversion Error',
        description: `Failed to convert your file. ${errorMessage}`,
        variant: 'destructive',
      });
    }
  };

  const reset = () => {
    setFiles([]);
    setUrl('');
    setConversionState('idle');
    setProgress(0);
    setError(null);
    setResult(null);
  };

  const renderIdleState = () => {
    if (isUrlTool) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={handleUrlChange}
                className="flex-grow"
              />
              <Button onClick={handleConvert}>Convert</Button>
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent className="p-6">
          {files.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-primary/50',
                isDragActive && 'border-primary bg-primary/10'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept={
                  tool.accept
                    ? Array.isArray(tool.accept)
                      ? tool.accept.join(',')
                      : tool.accept
                    : undefined
                }
                multiple={isMultiFile}
              />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="w-12 h-12" />
                <p className="font-semibold">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-sm">Max file size: 10MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileIcon className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium truncate">{file.name}</span>
                    <span className="text-sm text-muted-foreground shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button className="w-full" onClick={handleConvert}>
                Convert Now
              </Button>
            </div>
          )}
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>
    );
  };

  const renderProcessingState = () => (
    <Card>
      <CardContent className="p-6 text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="font-semibold">Processing your file(s)...</p>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">{progress}% complete</p>
      </CardContent>
    </Card>
  );

  const renderSuccessState = () => {
    if (result?.isObjectUrl) {
      return (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-center">Conversion Successful!</h2>
              <p className="text-muted-foreground text-center">Your temporary Object URL is ready.</p>
            </div>
            <div className="relative">
              <Textarea
                readOnly
                value={result.url}
                className="h-48 resize-none pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  navigator.clipboard.writeText(result.url);
                  toast({ title: 'Copied to clipboard!' });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
             <Button variant="outline" size="lg" onClick={reset} className='w-full'>
              <RotateCcw className="mr-2" />
              Convert Another
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Conversion Successful!</h2>
          <p className="text-muted-foreground">Your file is ready for download.</p>
          {result?.analysis && (
            <div className="text-left bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Analysis Summary</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {result.analysis}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href={result?.url} download={result?.name}>
                <Download className="mr-2" />
                Download File
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={reset}>
              <RotateCcw className="mr-2" />
              Convert Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderErrorState = () => (
    <Card>
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <X className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold">Conversion Failed</h2>
        <p className="text-destructive">{error}</p>
        <Button variant="outline" size="lg" onClick={reset}>
          <RotateCcw className="mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );

  switch (conversionState) {
    case 'processing':
      return renderProcessingState();
    case 'success':
      return renderSuccessState();
    case 'error':
      return renderErrorState();
    case 'idle':
    default:
      return renderIdleState();
  }
}
