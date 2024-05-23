import '@/app/ui/global.css';
import { inter, kumbhSans } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.className} antialiased`}>{children}</body>
    </html>
  );
}
