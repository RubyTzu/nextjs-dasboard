import { Inter, Lusitana, Kumbh_Sans } from "next/font/google";
export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const lusitana = Lusitana({ subsets: ['latin'],weight: [ "400", "700"], });
export const kumbhSans = Kumbh_Sans({ subsets: ['latin'], weight: ['100','200','300','400','500','600', '700','800','900'] });