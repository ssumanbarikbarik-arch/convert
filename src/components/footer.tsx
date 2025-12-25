import Link from 'next/link';
import { Github, Twitter as XIcon } from 'lucide-react';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.54 0c-1.356 0-2.647.385-3.815.99a8.88 8.88 0 0 0-3.454 0A10.22 10.22 0 0 0 8.46.99C7.293.385 6.002 0 4.646 0 3.326 0 .75 1.115.75 4.333c0 1.71.625 3.28 1.688 4.473-1.01.75-1.688 1.688-1.688 2.836 0 .23.024.45.07.662C.073 14.38.75 18.067.75 18.067l3.28-2.02a13.33 13.33 0 0 0 3.394 1.48 13.06 13.06 0 0 0 3.812 0 13.2 13.2 0 0 0 3.396-1.48l3.28 2.02s.677-3.687.02-5.746a5.07 5.07 0 0 0 .07-.662c0-1.148-.68-2.086-1.69-2.836C22.625 7.613 23.25 6.043 23.25 4.333 23.25 1.115 20.875 0 19.54 0zm-5.07 10.748c-1.012 0-1.838-.9-1.838-2.003s.826-2.003 1.838-2.003c1.01 0 1.836.9 1.836 2.003s-.826 2.003-1.836 2.003zm-6.088 0c-1.012 0-1.838-.9-1.838-2.003s.826-2.003 1.838-2.003c1.012 0 1.838.9 1.838 2.003s-.826 2.003-1.838 2.003z" />
    </svg>
);


export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-6">
            <div className="lg:col-span-2">
                 <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-2xl font-logo">
                    <span className="text-foreground">Swift</span>
                    <span className="text-primary">Convert</span>
                    </span>
                </Link>
                <p className="text-muted-foreground mt-4">
                    Your all-in-one file conversion solution.
                </p>
                <div className="flex space-x-4 mt-6">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <DiscordIcon className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <XIcon className="h-6 w-6" />
                    </Link>
                </div>
            </div>
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">SaaS</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Company Website</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">E-commerce</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Web Apps</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">CMS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Tools</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Merge PDF</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Split PDF</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Compress PDF</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Image Converter</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Image to URL</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">News</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Topic Scenarios</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Related Products</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Edge Acceleration</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Edge Media</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Edge Functions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SwiftConvert. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Legal</Link>
             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}