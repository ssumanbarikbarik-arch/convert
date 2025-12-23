import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { tools, iconMap } from '@/lib/tools';

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-headline">
          Tools
        </h1>
        <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Swiftly convert, merge, split, and compress your files with our suite
          of powerful online tools.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map(tool => {
            const Icon = iconMap[tool.iconName];
            return (
              <Link href={`/${tool.slug}`} key={tool.slug} className="group">
                <Card className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{ backgroundColor: tool.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg font-semibold">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
