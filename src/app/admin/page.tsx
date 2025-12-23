import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 font-headline">
          Admin Panel
        </h1>
        <p className="text-muted-foreground">
          Manage your SwiftConvert application.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Conversions</CardTitle>
            <CardDescription>
              Overall number of successful conversions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234,567</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Number of registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">8,912</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tools Status</CardTitle>
            <CardDescription>
              Overview of enabled/disabled tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12 / 12</p>
            <p className="text-sm text-muted-foreground">Enabled Tools</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>user-1</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>2023-01-15</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user-2</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>2023-02-20</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
