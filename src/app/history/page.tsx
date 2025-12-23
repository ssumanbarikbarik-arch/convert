import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function HistoryPage() {
  const conversions = [
    {
      id: '1',
      tool: 'JPG to PDF',
      date: '2023-10-27',
      status: 'Completed',
      original: 'vacation.jpg',
      result: 'vacation.pdf',
    },
    {
      id: '2',
      tool: 'Compress PDF',
      date: '2023-10-26',
      status: 'Completed',
      original: 'report.pdf',
      result: 'report-compressed.pdf',
    },
    {
      id: '3',
      tool: 'URL to PDF',
      date: '2023-10-25',
      status: 'Failed',
      original: 'https://example.com',
      result: '-',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 font-headline">
          Conversion History
        </h1>
        <p className="text-muted-foreground">
          This is a record of your past file conversions.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Note: This is a placeholder page for logged-in users.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Original</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversions.map(conv => (
                <TableRow key={conv.id}>
                  <TableCell className="font-medium">{conv.tool}</TableCell>
                  <TableCell>{conv.date}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    {conv.original}
                  </TableCell>
                  <TableCell className="truncate max-w-xs">
                    {conv.result}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        conv.status === 'Completed' ? 'default' : 'destructive'
                      }
                    >
                      {conv.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
