import { Inter } from 'next/font/google';
import './global.css';




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

const styles = {
  body: {
    background: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  },
};