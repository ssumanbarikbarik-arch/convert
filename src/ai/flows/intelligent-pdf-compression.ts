'use server';

/**
 * @fileOverview Intelligent PDF Compression AI agent.
 *
 * - intelligentPdfCompression - A function that handles the intelligent PDF compression process.
 * - IntelligentPdfCompressionInput - The input type for the intelligentPdfCompression function.
 * - IntelligentPdfCompressionOutput - The return type for the intelligentPdfCompression function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {PDFDocument} from 'pdf-lib';

const IntelligentPdfCompressionInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'A PDF file as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  compressionLevel: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .default(2)
    .describe('The level of compression to apply: 1 (Low), 2 (Recommended), 3 (Extreme).'),
});
export type IntelligentPdfCompressionInput = z.infer<
  typeof IntelligentPdfCompressionInputSchema
>;

const IntelligentPdfCompressionOutputSchema = z.object({
  compressedPdfDataUri: z
    .string()
    .describe(
      'The compressed PDF file as a data URI, with MIME type and Base64 encoding.'
    ),
  analysisSummary: z
    .string()
    .describe(
      'A summary of the analysis performed on the PDF and the compression settings used.'
    ),
  originalSize: z.number().describe('The original size of the PDF in bytes.'),
  newSize: z.number().describe('The new size of the PDF in bytes.'),
});
export type IntelligentPdfCompressionOutput = z.infer<
  typeof IntelligentPdfCompressionOutputSchema
>;

export async function intelligentPdfCompression(
  input: IntelligentPdfCompressionInput
): Promise<IntelligentPdfCompressionOutput> {
  return intelligentPdfCompressionFlow(input);
}

const intelligentPdfCompressionFlow = ai.defineFlow(
  {
    name: 'intelligentPdfCompressionFlow',
    inputSchema: IntelligentPdfCompressionInputSchema,
    outputSchema: IntelligentPdfCompressionOutputSchema,
  },
  async input => {
    const base64Data = input.pdfDataUri.split(',')[1];
    const pdfBytes = Buffer.from(base64Data, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Flatten form fields if they exist
    const form = pdfDoc.getForm();
    try {
        form.flatten();
    } catch {
        // Ignore error if no form fields exist
    }
    
    // This is a basic compression strategy. For more advanced compression,
    // one would need to process images within the PDF, which is complex.
    // `useObjectStreams: false` can sometimes reduce file size for very small documents
    // by avoiding the overhead of object streams, but for larger documents, `true` is better.
    const useObjectStreams = pdfDoc.getPageCount() > 1;

    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams });
    
    const compressedPdfDataUri = `data:application/pdf;base64,${Buffer.from(
      compressedPdfBytes
    ).toString('base64')}`;

    return {
      compressedPdfDataUri,
      analysisSummary: `PDF structure has been optimized. For further reduction, consider using a tool that specifically compresses images within the PDF.`,
      originalSize: pdfBytes.length,
      newSize: compressedPdfBytes.length
    };
  }
);

    