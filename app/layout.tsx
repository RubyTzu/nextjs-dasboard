import '@/app/ui/global.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';

export const metadata = {
  title: 'Next JS Test',
  description: 'A place for me to practice NextJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
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
