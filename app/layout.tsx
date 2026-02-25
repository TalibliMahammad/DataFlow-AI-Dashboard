import { Inter } from 'next/font/google';
import './global.css';
import { redirect } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Data-Flow AI Admin Dashboard',
  description: 'AI-powered task management',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az " suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}

