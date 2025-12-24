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

import React, { useState, useCallback, useRef, useMemo } from 'react';
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
import { useFirebase } from '@/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Label } from '@/components/ui/label';
import JSZip from 'jszip';
import { Slider } from '@/components/ui/slider';


type ConversionState = 'idle' | 'processing' | 'success' | 'error';
type ClientTool = Omit<Tool, 'icon'> & { iconName: string };

export function ToolClientPage({ tool }: { tool: ClientTool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [pageRange, setPageRange] = useState('');
  const [password, setPassword] = useState('');
  const [compressionQuality, setCompressionQuality] = useState([70]);
  const [conversionState, setConversionState] =
    useState<ConversionState>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    name: string;
    analysis?: string;
    isShareableUrl?: boolean;
  } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { firebaseApp } = useFirebase();

  const isUrlTool = tool.slug === 'url-to-pdf';
  const isMultiFile = tool.slug === 'merge-pdf';
  const isImageToUrlTool = tool.slug === 'host-image-to-url';
  const isSplitPdfTool = tool.slug === 'split-pdf';
  const isImageCompressTool = tool.slug === 'compress-image';
  const isPdfToWordTool = tool.slug === 'pdf-to-word';
  const isImageToPdfTool = tool.slug === 'image-to-pdf';
  const isPdfToImageTool = tool.slug === 'pdf-to-image';
  const isProtectPdfTool = tool.slug === 'protect-pdf';

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
  
  const handlePageRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageRange(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const isJpg = useMemo(() => {
    if (isImageCompressTool && files.length > 0) {
      return files[0].type === 'image/jpeg';
    }
    return false;
  }, [files, isImageCompressTool]);

  const handleConvert = async () => {
    if (isUrlTool && !url) {
      setError('Please enter a URL.');
      return;
    }
    if (!isUrlTool && files.length === 0) {
      setError('Please select at least one file.');
      return;
    }
    if (isSplitPdfTool && !pageRange) {
      setError('Please enter a page range.');
      return;
    }
    if (isProtectPdfTool && !password) {
      setError('Please enter a password.');
      return;
    }


    setConversionState('processing');
    setProgress(0);
    setError(null);

    let progressInterval: NodeJS.Timeout | undefined;
    if (!isImageToUrlTool) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval as NodeJS.Timeout);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
    }

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
      } else if (isPdfToWordTool && files.length > 0) {
        const pdfjs = await import('pdfjs-dist/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let textContent = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          textContent += text.items.map(item => ('str' in item ? item.str : '')).join(' ') + '\n\n';
        }

        const blob = new Blob([textContent], { type: 'application/msword' });
        const resultUrl = URL.createObjectURL(blob);

        if (progressInterval) clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: resultUrl,
          name: `${files[0].name.replace(/\.pdf$/, '')}.doc`,
        });

      } else if (isImageCompressTool && files.length > 0) {
          const imageFile = files[0];
          const imageUrl = URL.createObjectURL(imageFile);
          const image = new Image();
          image.src = imageUrl;

          const { promise, resolve } = Promise.withResolvers<string>();

          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Could not get canvas context');
            }
            ctx.drawImage(image, 0, 0);

            // For JPG, quality can be adjusted. For PNG, it's lossless.
            const quality = imageFile.type === 'image/jpeg' ? compressionQuality[0] / 100 : 1.0;
            const resultDataUrl = canvas.toDataURL(imageFile.type, quality);
            URL.revokeObjectURL(imageUrl);
            resolve(resultDataUrl);
          };
          
          image.onerror = () => {
             URL.revokeObjectURL(imageUrl);
             throw new Error('Failed to load image for compression.');
          }

          const resultUrl = await promise;

          if (progressInterval) clearInterval(progressInterval);
          setProgress(100);
          setConversionState('success');
          setResult({
            url: resultUrl,
            name: `compressed-${files[0].name}`,
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
      } else if (isSplitPdfTool && files.length > 0) {
        const pdfLib = await import('pdf-lib');
        const pdfDoc = await pdfLib.PDFDocument.load(await files[0].arrayBuffer());

        const zip = new JSZip();

        const totalPages = pdfDoc.getPageCount();
        const ranges = pageRange.split(',').map(s => s.trim());
        const pagesToExtract = new Set<number>();

        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
              pagesToExtract.add(i - 1);
            }
          } else {
            const pageNum = Number(range);
            if (pageNum >= 1 && pageNum <= totalPages) {
              pagesToExtract.add(pageNum - 1);
            }
          }
        }
        
        if (pagesToExtract.size === 0) {
            throw new Error('No valid pages to extract. Please check your page range and the number of pages in the PDF.');
        }

        const newPdfDoc = await pdfLib.PDFDocument.create();
        const copiedPages = await newPdfDoc.copyPages(pdfDoc, Array.from(pagesToExtract));
        copiedPages.forEach(page => newPdfDoc.addPage(page));

        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const resultUrl = URL.createObjectURL(blob);

        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');

        setResult({
          url: resultUrl,
          name: `split-${files[0].name}`,
        });

      } else if (isProtectPdfTool && files.length > 0) {
        const pdfLib = await import('pdf-lib');
        const pdfDoc = await pdfLib.PDFDocument.load(await files[0].arrayBuffer());

        const pdfBytes = await pdfDoc.save({
          useObjectStreams: false, // Passwords don't work with object streams
          userPassword: password,
          ownerPassword: password,
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const resultUrl = URL.createObjectURL(blob);
        
        if (progressInterval) clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: resultUrl,
          name: `protected-${files[0].name}`,
        });

      } else if (isMultiFile && files.length > 0) {
        const pdfLib = await import('pdf-lib');
        const mergedPdf = await pdfLib.PDFDocument.create();
        
        for (const file of files) {
          const pdfBytes = await file.arrayBuffer();
          const pdf = await pdfLib.PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
          });
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const resultUrl = URL.createObjectURL(blob);

        clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');

        setResult({
          url: resultUrl,
          name: 'merged.pdf',
        });
      } else if (isImageToUrlTool && files.length > 0) {
        if (!firebaseApp) {
          throw new Error('Firebase not initialized');
        }
        const storage = getStorage(firebaseApp);
        const file = files[0];
        const uniqueFileName = `${Date.now()}-${file.name}`;
        const imageRef = storageRef(storage, `images/${uniqueFileName}`);
        
        await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(imageRef);

        setConversionState('success');
        setProgress(100);
        setResult({
          url: downloadUrl,
          name: file.name,
          isShareableUrl: true,
        });
      } else if (isImageToPdfTool && files.length > 0) {
        const pdfLib = await import('pdf-lib');
        const pdfDoc = await pdfLib.PDFDocument.create();
        const imageFile = files[0];
        const imageBytes = await imageFile.arrayBuffer();

        let image;
        if (imageFile.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (imageFile.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          throw new Error('Unsupported image type. Please use JPG or PNG.');
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

        if (progressInterval) clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: resultUrl,
          name: `${imageFile.name.replace(/\.[^/.]+$/, "")}.pdf`,
        });
      } else if (isPdfToImageTool && files.length > 0) {
        const pdfjs = await import('pdfjs-dist/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
        
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(1); // Get the first page
        
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!context) {
          throw new Error('Could not get canvas context');
        }

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const resultUrl = canvas.toDataURL('image/png');
        
        if (progressInterval) clearInterval(progressInterval);
        setProgress(100);
        setConversionState('success');
        setResult({
          url: resultUrl,
          name: `${files[0].name.replace(/\.pdf$/, '')}.png`,
        });
      } else {
        // Placeholder for any other tool
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
      if (progressInterval) clearInterval(progressInterval);
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
    setPageRange('');
    setPassword('');
    setCompressionQuality([70]);
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
               {isSplitPdfTool && (
                <div className="grid gap-2">
                  <Label htmlFor="page-range">Page range</Label>
                  <Input
                    id="page-range"
                    placeholder="e.g., 1-3, 5, 8"
                    value={pageRange}
                    onChange={handlePageRangeChange}
                  />
                   <p className="text-xs text-muted-foreground">
                    Enter page numbers and/or ranges separated by commas.
                  </p>
                </div>
              )}
              {isProtectPdfTool && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a password to protect your PDF.
                  </p>
                </div>
              )}
              {isImageCompressTool && isJpg && (
                <div className="grid gap-2 pt-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="quality">Compression Quality</Label>
                    <span className="text-sm font-medium text-muted-foreground">{compressionQuality[0]}%</span>
                  </div>
                  <Slider
                    id="quality"
                    min={10}
                    max={100}
                    step={10}
                    value={compressionQuality}
                    onValueChange={setCompressionQuality}
                  />
                   <p className="text-xs text-muted-foreground">
                    Lower values result in smaller file sizes but lower quality.
                  </p>
                </div>
              )}
              {isMultiFile && files.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                      fileInputRef.current.click();
                    }
                  }}
                >
                  Add More Files
                </Button>
              )}
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
        {!isImageToUrlTool && (
          <>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderSuccessState = () => {
    if (result?.isShareableUrl) {
      return (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-center">Upload Successful!</h2>
              <p className="text-muted-foreground text-center">Your shareable URL is ready.</p>
            </div>
            <div className="relative">
              <Textarea
                readOnly
                value={result.url}
                className="h-24 resize-none pr-12"
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
