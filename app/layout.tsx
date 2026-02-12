import './global.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className="bg-background overflow-x-hidden" style={styles.body}>
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