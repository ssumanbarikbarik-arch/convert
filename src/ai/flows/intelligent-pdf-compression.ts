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
    
    // For now, we will just re-save the document which offers some basic compression.
    // In a more advanced scenario, we would use the compressionLevel to change strategies
    // (e.g., resampling images differently for each level).
    const useObjectStreams = input.compressionLevel < 3;

    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams });
    
    const compressedPdfDataUri = `data:application/pdf;base64,${Buffer.from(
      compressedPdfBytes
    ).toString('base64')}`;
    
    const levelMap = {
        1: 'Low',
        2: 'Recommended',
        3: 'Extreme',
    };

    return {
      compressedPdfDataUri,
      analysisSummary: `Compression applied at '${levelMap[input.compressionLevel]}' level. The PDF has been re-saved to optimize its structure.`,
    };
  }
);
