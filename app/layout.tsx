import type { Viewport } from 'next';
import '@/app/ui/global.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content',
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata = {
  title: 'Next JS Test',
  description: 'A place for me to practice NextJS',
  metadataBase: new URL('https://nextjs-dasboard-woad.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'zh-TW': '/zh-TW',
    },
  },
  openGraph: {
    title: 'Next JS Test',
    description: 'A place for me to practice NextJS',
    url: 'https://nextjs-dasboard-woad.vercel.app/test/split/1forTestOnly',
    siteName: 'Next JS Test',
    images: [
      {
        url: '/images/1200_630.jpg',
        width: 1200,
        height: 630,
        alt: 'A descriptive alt text for the image',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Next JS Test" />
        <meta property="og:description" content="A place for me to practice NextJS" />
        <meta property="og:url" content="https://nextjs-dasboard-woad.vercel.app/test/split/1forTestOnly" />
        <meta property="og:site_name" content="Next JS Test" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:image:url" content="/images/1200_630.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="My custom alt" />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
//directly use font in next google:
//${inter.className}  ${notoSansJP.className}

//set variable and use TailwindCSS config to fetch the exact font
//${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} font-sans
